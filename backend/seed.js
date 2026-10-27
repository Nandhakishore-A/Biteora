import "dotenv/config";
import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import { dishes } from "./catalogData.js";

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas for seeding...");

    // Remove existing items and insert initial menu items
    await foodModel.deleteMany({});
    const inserted = await foodModel.insertMany(dishes);
    console.log(`Successfully seeded ${inserted.length} dishes across all 12 categories!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
