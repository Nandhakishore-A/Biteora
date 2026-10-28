import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodModel from "./models/foodModel.js";
import { dishes } from "./catalogData.js";

const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connection.asPromise();
    }
    console.log("Connected to MongoDB!");

    let addedCount = 0;
    let updatedCount = 0;

    for (const dish of dishes) {
      const existing = await foodModel.findOne({ name: dish.name });
      if (!existing) {
        await foodModel.create({
          ...dish,
          isAvailable: true
        });
        addedCount++;
      } else {
        await foodModel.findByIdAndUpdate(existing._id, {
          description: dish.description,
          price: dish.price,
          category: dish.category,
          image: dish.image,
          rating: dish.rating,
          reviewsCount: dish.reviewsCount,
          prepTime: dish.prepTime,
          isVeg: dish.isVeg,
          tag: dish.tag,
          calories: dish.calories,
          isAvailable: true
        });
        updatedCount++;
      }
    }

    const total = await foodModel.countDocuments();
    console.log(`Seeding complete: ${addedCount} added, ${updatedCount} updated. Total in DB: ${total}`);
  } catch (err) {
    console.error("Seeding error:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();
