import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import "dotenv/config";
import app from "../server.js";
import { connectDB } from "../config/db.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";

const TEST_PORT = 4055;
const BASE_URL = `http://localhost:${TEST_PORT}`;
let server;
let authToken = "";
let testUserId = "";
let testFoodId = "";
let isConnected = false;

before(async () => {
    process.env.NODE_ENV = "test";
    isConnected = await connectDB();
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.asPromise();
    }
    server = app.listen(TEST_PORT);
});

after(async () => {
    if (mongoose.connection.readyState !== 0) {
        if (testUserId) {
            try { await userModel.findByIdAndDelete(testUserId); } catch {}
            try { await orderModel.deleteMany({ userId: testUserId }); } catch {}
        }
        if (testFoodId) {
            try { await foodModel.findByIdAndDelete(testFoodId); } catch {}
        }
        await mongoose.disconnect();
    }
    if (server) {
        server.close();
    }
});

describe("Biteora API Automated Verification Suite", () => {
    test("Health check endpoint returns service info with appropriate status code", async () => {
        const res = await fetch(`${BASE_URL}/api/health`);
        assert.ok([200, 503].includes(res.status), `Expected status 200 or 503, got ${res.status}`);
        const data = await res.json();
        assert.ok(["ok", "degraded"].includes(data.status));
        assert.equal(data.service, "Biteora API");
        assert.ok(data.timestamp);
    });

    test("Catalog listing returns dishes array across all categories", async () => {
        const res = await fetch(`${BASE_URL}/api/food/list`);
        assert.equal(res.status, 200);
        const data = await res.json();
        assert.equal(data.success, true);
        assert.ok(Array.isArray(data.data));
        assert.ok(data.data.length >= 18, `Expected at least 18 catalog items, got ${data.data.length}`);
    });

    test("Unauthenticated menu addition is strictly rejected with HTTP 401", async () => {
        const res = await fetch(`${BASE_URL}/api/food/add`, {
            method: "POST"
        });
        assert.equal(res.status, 401);
    });

    test("Unauthenticated order placement is strictly rejected with HTTP 401", async () => {
        const res = await fetch(`${BASE_URL}/api/order/place`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ foodId: "123", quantity: 1 }] })
        });
        assert.equal(res.status, 401);
    });

    test("Direct user registration and login verification (when connected to Atlas)", async (t) => {
        if (!isConnected || mongoose.connection.readyState !== 1) {
            t.skip("Skipping DB user write test - Atlas port 27017 unreachable on current network");
            return;
        }

        const uniqueEmail = `test_${Date.now()}@biteora.test`;
        const res = await fetch(`${BASE_URL}/api/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Test Runner",
                email: uniqueEmail,
                password: "SecurePassword123!"
            })
        });

        assert.equal(res.status, 201);
        const data = await res.json();
        assert.equal(data.success, true);
        assert.ok(data.token);
        authToken = data.token;
        testUserId = data.user.id;

        // Login check
        const loginRes = await fetch(`${BASE_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: uniqueEmail,
                password: "SecurePassword123!"
            })
        });
        assert.equal(loginRes.status, 200);
        const loginData = await loginRes.json();
        assert.equal(loginData.success, true);

        // Profile check
        const profRes = await fetch(`${BASE_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        assert.equal(profRes.status, 200);
        const profData = await profRes.json();
        assert.equal(profData.data.name, "Test Runner");
    });

    test("Server-side price verification and Cash on Delivery order placement", async (t) => {
        if (!isConnected || mongoose.connection.readyState !== 1) {
            t.skip("Skipping DB order write test - Atlas port 27017 unreachable on current network");
            return;
        }

        const testDish = new foodModel({
            name: "Verified Biryani",
            description: "Aromatic basmati rice with spices",
            price: 250,
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
            category: "Biryani",
            isAvailable: true
        });
        await testDish.save();
        testFoodId = testDish._id.toString();

        const res = await fetch(`${BASE_URL}/api/order/place`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                items: [
                    {
                        foodId: testFoodId,
                        name: "Spoofed Cheap Name",
                        price: 1, // Client attempting to tamper price!
                        quantity: 2
                    }
                ],
                paymentMethod: "COD",
                promoCode: "BITEORA10",
                address: {
                    firstName: "Test",
                    lastName: "Customer",
                    street: "123 Feast Street",
                    city: "Chennai",
                    state: "TN",
                    zipCode: "600001",
                    phone: "9876543210"
                }
            })
        });

        assert.equal(res.status, 200);
        const data = await res.json();
        assert.equal(data.success, true);
        assert.equal(data.isCOD, true);
        assert.ok(data.orderId);

        const savedOrder = await orderModel.findById(data.orderId);
        assert.equal(savedOrder.amount, 452, "Server must enforce ₹452 (₹500 - ₹50 + ₹2 delivery)");
        assert.equal(savedOrder.items[0].name, "Verified Biryani");
        assert.equal(savedOrder.paymentMethod, "COD");
        assert.equal(savedOrder.status, "Confirmed");
    });
});
