import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { Cart } from "../models/cart.model.js";
import { MenuItem } from "../models/menuItem.model.js";

const router = express.Router();

async function getPopulatedCart(userId) {
  return Cart.findOne({ user: userId })
    .populate("restaurant")
    .populate({
      path: "items.menuItem",
      populate: { path: "restaurant" }
    });
}

router.get("/", protect, async (req, res, next) => {
  try {
    const cart = await getPopulatedCart(req.user._id);
    res.json({ cart: cart || { items: [] } });
  } catch (error) {
    next(error);
  }
});

router.post("/items", protect, async (req, res, next) => {
  try {
    const { menuItemId, quantity = 1 } = req.body;
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem || !menuItem.isAvailable) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        restaurant: menuItem.restaurant,
        items: [{ menuItem: menuItem._id, quantity }]
      });
    } else {
      if (cart.restaurant && String(cart.restaurant) !== String(menuItem.restaurant)) {
        cart.restaurant = menuItem.restaurant;
        cart.items = [];
      }

      const existing = cart.items.find((item) => String(item.menuItem) === String(menuItem._id));
      if (existing) {
        existing.quantity += Number(quantity);
      } else {
        cart.items.push({ menuItem: menuItem._id, quantity });
      }

      await cart.save();
    }

    res.status(201).json({ cart: await getPopulatedCart(req.user._id) });
  } catch (error) {
    next(error);
  }
});

router.patch("/items/:menuItemId", protect, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((entry) => String(entry.menuItem) === req.params.menuItemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    if (Number(quantity) <= 0) {
      cart.items = cart.items.filter((entry) => String(entry.menuItem) !== req.params.menuItemId);
    } else {
      item.quantity = Number(quantity);
    }

    if (cart.items.length === 0) cart.restaurant = undefined;
    await cart.save();

    res.json({ cart: await getPopulatedCart(req.user._id) });
  } catch (error) {
    next(error);
  }
});

router.delete("/items/:menuItemId", protect, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ cart: { items: [] } });

    cart.items = cart.items.filter((entry) => String(entry.menuItem) !== req.params.menuItemId);
    if (cart.items.length === 0) cart.restaurant = undefined;
    await cart.save();

    res.json({ cart: await getPopulatedCart(req.user._id) });
  } catch (error) {
    next(error);
  }
});

export default router;
