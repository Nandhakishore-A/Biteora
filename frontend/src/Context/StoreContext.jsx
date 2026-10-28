import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list as fallbackFoodList } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [appliedPromo, setAppliedPromo] = useState(null);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/add",
                    { itemId, foodId: itemId },
                    {
                        headers: {
                            token,
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error("Failed to add cart item:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[itemId] > 1) {
                updated[itemId] -= 1;
            } else {
                delete updated[itemId];
            }
            return updated;
        });

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/remove",
                    { itemId, foodId: itemId },
                    {
                        headers: {
                            token,
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error("Failed to remove cart item:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => (product._id || product.id) === item);
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const applyPromoCode = (code) => {
        const clean = String(code || "").trim().toUpperCase();
        const subtotal = getTotalCartAmount();
        if (subtotal === 0) {
            return { success: false, message: "Add items to your cart before applying a coupon." };
        }
        if (clean === "BITEORA10" || clean === "BITE10") {
            setAppliedPromo({ code: clean, discountPercent: 10, label: "10% Off Biteora Special" });
            return { success: true, message: `Coupon ${clean} applied! 10% discount added.` };
        }
        if (clean === "WELCOME50") {
            if (subtotal < 200) {
                return { success: false, message: "WELCOME50 requires a minimum subtotal of ₹200." };
            }
            setAppliedPromo({ code: "WELCOME50", flatDiscount: 50, label: "₹50 Off Welcome Treat" });
            return { success: true, message: "Coupon WELCOME50 applied! Flat ₹50 discount added." };
        }
        if (clean === "FREEDEL") {
            setAppliedPromo({ code: "FREEDEL", freeDelivery: true, label: "Free Delivery Waived" });
            return { success: true, message: "Coupon FREEDEL applied! ₹2 delivery fee waived." };
        }
        return { success: false, message: "Invalid coupon. Use BITE10, BITEORA10, WELCOME50, or FREEDEL." };
    };

    const removePromoCode = () => {
        setAppliedPromo(null);
    };

    const getDiscountAmount = () => {
        const subtotal = getTotalCartAmount();
        if (!appliedPromo || subtotal === 0) return 0;
        if (appliedPromo.code === "BITEORA10" || appliedPromo.code === "BITE10") {
            return Math.round(subtotal * 0.10);
        }
        if (appliedPromo.code === "WELCOME50") {
            return subtotal >= 200 ? 50 : 0;
        }
        if (appliedPromo.code === "FREEDEL") {
            return 2;
        }
        return 0;
    };

    const getDeliveryFee = () => {
        const subtotal = getTotalCartAmount();
        if (subtotal === 0) return 0;
        if (appliedPromo && appliedPromo.code === "FREEDEL") return 0;
        return 2;
    };

    const getFinalTotal = () => {
        const subtotal = getTotalCartAmount();
        if (subtotal === 0) return 0;
        const discount = getDiscountAmount();
        const fee = getDeliveryFee();
        return Math.max(0, subtotal - (appliedPromo?.code === "FREEDEL" ? 0 : discount) + fee);
    };

    const clearCart = () => {
        setCartItems({});
        setAppliedPromo(null);
    };

    const loadData = async () => {
        try {
            const foodResponse = await axios.get(url + "/api/food/list");
            if (foodResponse.data.data && foodResponse.data.data.length > 0) {
                setFoodList(foodResponse.data.data);
            } else {
                setFoodList(fallbackFoodList);
            }
        } catch {
            setFoodList(fallbackFoodList);
        }

        const localToken = localStorage.getItem("token");
        if (localToken) {
            setToken(localToken);
            try {
                const cartResponse = await axios.post(
                    url + "/api/cart/get",
                    {},
                    {
                        headers: {
                            token: localToken,
                            Authorization: `Bearer ${localToken}`
                        }
                    }
                );
                setCartItems(cartResponse.data.cartData || {});
            } catch (error) {
                console.error("Failed to load cart:", error);
            }
        }
    };

    useEffect(() => {
        void loadData();
    }, [url]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        getDiscountAmount,
        getDeliveryFee,
        getFinalTotal,
        clearCart,
        url,
        token,
        setToken,
        loadData
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
