import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    cuisines: [{ type: String, required: true }],
    rating: { type: Number, default: 4 },
    deliveryTime: { type: String, default: "30-40 min" },
    deliveryFee: { type: Number, default: 30 },
    location: { type: String, required: true },
    isOpen: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
