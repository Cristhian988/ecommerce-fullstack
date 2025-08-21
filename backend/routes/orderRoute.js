import express from "express";
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

// Admin Features
router.post("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);

// Payment Features
router.post("/place", authUser, placeOrder);
router.post("/stripe", authUser, placeOrderStripe);
router.post("/razorpay", authUser, placeOrderRazorpay);

// User Feature
router.post("/userorders", authUser, userOrders);

// Verify Stripe
router.post("/verifyStripe", authUser, verifyStripe);

// Verify Razorpay
router.post("/verifyRazorpay", authUser, verifyRazorpay);

export default router;
