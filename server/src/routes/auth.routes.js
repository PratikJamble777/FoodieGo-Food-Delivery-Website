import express from "express";
import { signToken } from "../lib/token.js";
import { protect } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";

const router = express.Router();

function userResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    addresses: user.addresses
  };
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      user: userResponse(user),
      token: signToken(user)
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      user: userResponse(user),
      token: signToken(user)
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", protect, (req, res) => {
  res.json({ user: userResponse(req.user) });
});

router.patch("/addresses", protect, async (req, res, next) => {
  try {
    const { line1, city, phone, label } = req.body;

    if (!line1 || !city || !phone) {
      return res.status(400).json({ message: "Address, city, and phone are required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: { line1, city, phone, label } } },
      { new: true }
    ).select("-password");

    res.json({ user: userResponse(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
