import express from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const router = express.Router();

router.post("/", protect, async (req, res, next) => {
  try {
    const { address } = req.body;

    if (!address?.line1 || !address?.city || !address?.phone) {
      return res.status(400).json({ message: "Complete delivery address is required" });
    }

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("restaurant")
      .populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cart.items.map((entry) => ({
      menuItem: entry.menuItem._id,
      name: entry.menuItem.name,
      price: entry.menuItem.price,
      quantity: entry.quantity,
      image: entry.menuItem.image
    }));

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = cart.restaurant.deliveryFee;
    const totalAmount = subtotal + deliveryFee;

    const order = await Order.create({
      user: req.user._id,
      restaurant: cart.restaurant._id,
      items,
      address,
      subtotal,
      deliveryFee,
      totalAmount
    });

    cart.items = [];
    cart.restaurant = undefined;
    await cart.save();

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
});

router.get("/my-orders", protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, adminOnly, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", protect, adminOnly, async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (error) {
    next(error);
  }
});

export default router;
