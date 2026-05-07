import express from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { Restaurant } from "../models/restaurant.model.js";
import { MenuItem } from "../models/menuItem.model.js";

const router = express.Router();

const ignoredSearchWords = new Set(["in", "near", "location", "locations", "restaurant", "restaurants", "food"]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/", async (req, res, next) => {
  try {
    const { search, cuisine } = req.query;
    const filter = {};

    if (search) {
      const terms = search
        .toString()
        .toLowerCase()
        .split(/\s+/)
        .map((term) => term.trim())
        .filter((term) => term && !ignoredSearchWords.has(term));
      const searchableTerms = terms.length > 0 ? terms : [search.toString()];

      filter.$and = searchableTerms.map((term) => ({
        $or: [
          { name: { $regex: escapeRegex(term), $options: "i" } },
          { cuisines: { $regex: escapeRegex(term), $options: "i" } },
          { location: { $regex: escapeRegex(term), $options: "i" } }
        ]
      }));
    }

    if (cuisine) {
      filter.cuisines = { $regex: cuisine, $options: "i" };
    }

    const restaurants = await Restaurant.find(filter).sort({ rating: -1, createdAt: -1 });
    res.json({ restaurants });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({ restaurant });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json({ restaurant });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/menu", async (req, res, next) => {
  try {
    const items = await MenuItem.find({
      restaurant: req.params.id,
      isAvailable: true
    }).sort({ category: 1, name: 1 });

    res.json({ items });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/menu", protect, adminOnly, async (req, res, next) => {
  try {
    const item = await MenuItem.create({
      ...req.body,
      restaurant: req.params.id
    });
    res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
});

export default router;
