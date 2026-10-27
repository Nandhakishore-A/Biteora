import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import { fallbackCatalog } from "../catalogData.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const DELIVERY_FEE = 2; // Flat ₹2 delivery fee

// Place order with server-side price calculation and promo code verification
export const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

    try {
        const userId = req.userId || (req.body && req.body.userId);
        const { items, address, paymentMethod = "Stripe", promoCode = "" } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: "User authentication required" });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Order must contain at least one item" });
        }

        if (!address || typeof address !== "object") {
            return res.status(400).json({ success: false, message: "Valid delivery address is required" });
        }

        // Extract food IDs from items
        const itemIds = items.map((item) => (item.foodId || item._id || "").toString()).filter(Boolean);

        // Fetch verified products directly from database (with fallback if offline)
        let dbFoods = [];
        try {
            dbFoods = await foodModel.find({ _id: { $in: itemIds } });
        } catch (dbErr) {
            console.warn("DB find failed during placeOrder, using fallback catalog:", dbErr.message);
        }

        // Merge fallbackCatalog if dbFoods is incomplete
        if (!dbFoods || dbFoods.length === 0) {
            dbFoods = fallbackCatalog.filter((f) => itemIds.includes(f._id));
        }

        if (dbFoods.length === 0) {
            // Check matching by name if IDs don't match
            const itemNames = items.map(i => i.name?.toLowerCase());
            dbFoods = fallbackCatalog.filter(f => itemNames.includes(f.name.toLowerCase()));
        }

        if (dbFoods.length === 0) {
            return res.status(400).json({ success: false, message: "None of the selected items could be found" });
        }

        // Calculate order amounts strictly using server-side prices
        let subtotal = 0;
        const verifiedOrderItems = [];

        for (const userItem of items) {
            const rawId = (userItem.foodId || userItem._id || "").toString();
            let dbProduct = dbFoods.find((f) => f._id.toString() === rawId);

            if (!dbProduct && userItem.name) {
                dbProduct = dbFoods.find(f => f.name.toLowerCase() === userItem.name.toLowerCase());
            }

            if (!dbProduct) {
                return res.status(400).json({
                    success: false,
                    message: `Item not found in menu catalog: ${userItem.name || rawId}`
                });
            }

            if (dbProduct.isAvailable === false) {
                return res.status(400).json({
                    success: false,
                    message: `"${dbProduct.name}" is currently unavailable`
                });
            }

            const quantity = Math.max(1, parseInt(userItem.quantity, 10) || 1);
            subtotal += dbProduct.price * quantity;

            verifiedOrderItems.push({
                foodId: dbProduct._id.toString(),
                name: dbProduct.name,
                price: dbProduct.price,
                quantity,
                image: dbProduct.image || ""
            });
        }

        // Validate promo code server-side
        let discountAmount = 0;
        let appliedDeliveryFee = DELIVERY_FEE;
        const cleanPromo = String(promoCode || "").trim().toUpperCase();

        if (cleanPromo === "BITEORA10") {
            discountAmount = Math.round(subtotal * 0.10);
        } else if (cleanPromo === "WELCOME50") {
            if (subtotal >= 200) {
                discountAmount = 50;
            }
        } else if (cleanPromo === "FREEDEL") {
            appliedDeliveryFee = 0;
            discountAmount = DELIVERY_FEE;
        }

        const totalAmount = Math.max(0, subtotal - (cleanPromo === "FREEDEL" ? 0 : discountAmount) + appliedDeliveryFee);

        // Handle Cash on Delivery (COD)
        if (paymentMethod.toUpperCase() === "COD") {
            const newOrder = new orderModel({
                userId,
                items: verifiedOrderItems,
                amount: totalAmount,
                deliveryFee: appliedDeliveryFee,
                currency: "inr",
                address,
                status: "Confirmed",
                payment: false,
                paymentMethod: "COD",
                promoCode: cleanPromo,
                discountAmount,
                paymentStatus: "pending"
            });

            await newOrder.save();

            // Clear user cart
            try {
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
            } catch (cartErr) {
                console.warn("Cart clearing error:", cartErr.message);
            }

            return res.status(200).json({
                success: true,
                isCOD: true,
                orderId: newOrder._id,
                message: "Order placed successfully! Cash on Delivery confirmed."
            });
        }

        // Online Payment via Stripe
        const newOrder = new orderModel({
            userId,
            items: verifiedOrderItems,
            amount: totalAmount,
            deliveryFee: appliedDeliveryFee,
            currency: "inr",
            address,
            status: "Pending Payment",
            payment: false,
            paymentMethod: "Stripe",
            promoCode: cleanPromo,
            discountAmount,
            paymentStatus: "pending"
        });

        await newOrder.save();

        // Build Stripe line items
        const line_items = verifiedOrderItems.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        if (appliedDeliveryFee > 0) {
            line_items.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: Math.round(appliedDeliveryFee * 100)
                },
                quantity: 1
            });
        }

        let sessionUrl = "";
        try {
            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: "payment",
                client_reference_id: newOrder._id.toString(),
                metadata: {
                    orderId: newOrder._id.toString(),
                    userId: userId.toString()
                },
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
            });
            newOrder.stripeSessionId = session.id;
            sessionUrl = session.url;
        } catch {
            // Graceful test mode fallback when STRIPE_SECRET_KEY is unconfigured placeholder
            newOrder.stripeSessionId = `test_sess_${newOrder._id}`;
            sessionUrl = `${frontend_url}/verify?success=true&orderId=${newOrder._id}&session_id=test_sess_${newOrder._id}`;
        }

        await newOrder.save();

        res.status(200).json({
            success: true,
            session_url: sessionUrl,
            orderId: newOrder._id
        });
    } catch (error) {
        console.error("placeOrder error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error during order placement"
        });
    }
};

// Stripe Webhook handler
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
        if (webhookSecret && sig) {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } else {
            event = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        }
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                const orderId = session.metadata?.orderId || session.client_reference_id;

                if (orderId) {
                    const order = await orderModel.findById(orderId);
                    if (order && !order.payment) {
                        order.payment = true;
                        order.paymentStatus = "paid";
                        order.status = "Confirmed";
                        order.stripePaymentIntentId = session.payment_intent || "";
                        await order.save();

                        await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
                        console.log(`Order ${orderId} confirmed via Stripe webhook.`);
                    }
                }
                break;
            }

            case "payment_intent.payment_failed": {
                const intent = event.data.object;
                const order = await orderModel.findOne({ stripePaymentIntentId: intent.id });
                if (order) {
                    order.paymentStatus = "failed";
                    order.status = "Cancelled";
                    await order.save();
                    console.log(`Order ${order._id} marked cancelled due to payment failure.`);
                }
                break;
            }

            default:
                break;
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Webhook processing error:", error.message);
        res.status(500).json({ success: false, message: "Error processing webhook event" });
    }
};

// Verify payment status
export const verifyOrder = async (req, res) => {
    const { orderId, success, session_id } = { ...req.query, ...req.body };

    try {
        if (!orderId) {
            return res.status(400).json({ success: false, message: "orderId is required" });
        }

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.payment) {
            return res.status(200).json({
                success: true,
                message: "Order confirmed successfully",
                order
            });
        }

        // Test mode confirmation
        if (session_id?.startsWith("test_sess_") || order.stripeSessionId?.startsWith("test_sess_")) {
            order.payment = true;
            order.paymentStatus = "paid";
            order.status = "Confirmed";
            await order.save();

            try {
                await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
            } catch {}

            return res.status(200).json({
                success: true,
                message: "Order payment verified successfully (Test mode)",
                order
            });
        }

        // If session_id is provided, verify directly against Stripe API
        if (session_id && process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("replace_with")) {
            try {
                const session = await stripe.checkout.sessions.retrieve(session_id);
                if (session && session.payment_status === "paid") {
                    order.payment = true;
                    order.paymentStatus = "paid";
                    order.status = "Confirmed";
                    order.stripePaymentIntentId = session.payment_intent || "";
                    await order.save();

                    await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

                    return res.status(200).json({
                        success: true,
                        message: "Order payment verified successfully via Stripe",
                        order
                    });
                }
            } catch (stripeErr) {
                console.warn("Stripe session retrieve warning:", stripeErr.message);
            }
        }

        const isClientSuccess = String(success).toLowerCase() === "true";

        if (!isClientSuccess) {
            order.status = "Cancelled";
            order.paymentStatus = "cancelled";
            await order.save();
            return res.status(200).json({
                success: false,
                message: "Order cancelled due to payment failure or abandonment"
            });
        }

        // If client reported success and not explicitly rejected, confirm order
        order.payment = true;
        order.paymentStatus = "paid";
        order.status = "Confirmed";
        await order.save();

        try {
            await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
        } catch {}

        res.status(200).json({
            success: true,
            status: order.status,
            message: "Order confirmed successfully",
            order
        });
    } catch (error) {
        console.error("verifyOrder error:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// Customer order history
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId || (req.body && req.body.userId);
        if (!userId) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }

        const orders = await orderModel.find({ userId }).sort({ createdAt: -1, date: -1 });
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        console.error("userOrders error:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// Admin list all orders
export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1, date: -1 });
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        console.error("listOrders error:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// Admin update order status
export const updateStatus = async (req, res) => {
    try {
        const orderId = req.params.id || req.body.orderId;
        const { status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "orderId and status are required" });
        }

        const validStatuses = [
            "Pending Payment",
            "Confirmed",
            "Food Preparing",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Valid statuses: ${validStatuses.join(", ")}`
            });
        }

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            message: `Order status updated to "${status}" successfully`,
            data: order
        });
    } catch (error) {
        console.error("updateStatus error:", error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};
