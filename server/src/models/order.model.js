import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [orderItemSchema],
    address: addressSchema,
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    orderStatus: {
      type: String,
      enum: ["placed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "placed"
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
