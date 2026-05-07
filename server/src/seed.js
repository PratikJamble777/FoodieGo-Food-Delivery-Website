import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { seedData } from "./lib/seedData.js";

dotenv.config();

async function seed() {
  await connectDB();
  await seedData({ clear: true });
  console.log("Seed data created");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
