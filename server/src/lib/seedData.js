import { restaurants, menuByRestaurant } from "../data/sampleData.js";
import { MenuItem } from "../models/menuItem.model.js";
import { Restaurant } from "../models/restaurant.model.js";
import { User } from "../models/user.model.js";

export async function seedData({ clear = false } = {}) {
  if (clear) {
    await Promise.all([Restaurant.deleteMany({}), MenuItem.deleteMany({})]);
  }

  const existingCount = await Restaurant.countDocuments();
  if (existingCount > 0 && !clear) {
    return false;
  }

  const createdRestaurants = await Restaurant.insertMany(restaurants);

  for (const restaurant of createdRestaurants) {
    const items = menuByRestaurant[restaurant.name].map(([name, description, price, category, isVeg]) => ({
      restaurant: restaurant._id,
      name,
      description,
      price,
      category,
      isVeg,
      image: restaurant.image
    }));

    await MenuItem.insertMany(items);
  }

  const adminEmail = "admin@foodapp.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: "admin123",
      role: "admin"
    });
  }

  return true;
}
