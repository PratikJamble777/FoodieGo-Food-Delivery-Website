import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is missing. Add it to server/.env");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
