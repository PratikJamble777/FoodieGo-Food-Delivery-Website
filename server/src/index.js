import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { seedData } from "./lib/seedData.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Food delivery API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(async () => {
    if (process.env.AUTO_SEED !== "false") {
      const seeded = await seedData();
      if (seeded) {
        console.log("Sample restaurant data created");
      }
    }

    const server = app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Stop the old server or change PORT in server/.env.`);
        process.exit(1);
      }

      throw error;
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
