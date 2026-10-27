import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
import { fallbackCatalog } from "../catalogData.js";

const UPLOAD_FOLDER = process.env.CLOUDINARY_FOLDER || "mern_stack_project_storage/Biteora";

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: UPLOAD_FOLDER,
                resource_type: "image"
            },
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
};

// Add food item
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, description, price, category) are required"
            });
        }

        const parsedPrice = Number(price);
        if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a valid positive number"
            });
        }

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                success: false,
                message: "Food image file is required"
            });
        }

        const uploadResult = await uploadToCloudinary(req.file.buffer);

        const food = new foodModel({
            name: name.trim(),
            description: description.trim(),
            price: parsedPrice,
            category: category.trim(),
            image: uploadResult.secure_url,
            cloudinaryPublicId: uploadResult.public_id,
            isAvailable: true
        });

        await food.save();
        res.status(201).json({
            success: true,
            message: "Food item added successfully",
            data: food
        });
    } catch (error) {
        console.error("addFood error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to add food item"
        });
    }
};

// Update food item
const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id || req.body.id;
        if (!foodId) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        const { name, description, price, category, isAvailable } = req.body;

        if (name) food.name = name.trim();
        if (description) food.description = description.trim();
        if (price !== undefined) {
            const parsedPrice = Number(price);
            if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
                return res.status(400).json({ success: false, message: "Invalid price value" });
            }
            food.price = parsedPrice;
        }
        if (category) food.category = category.trim();
        if (isAvailable !== undefined) {
            food.isAvailable = String(isAvailable) === "true" || isAvailable === true;
        }

        if (req.file && req.file.buffer) {
            const uploadResult = await uploadToCloudinary(req.file.buffer);

            if (food.cloudinaryPublicId) {
                try {
                    await cloudinary.uploader.destroy(food.cloudinaryPublicId);
                } catch (cleanupErr) {
                    console.warn("Failed to delete old Cloudinary image:", cleanupErr.message);
                }
            }

            food.image = uploadResult.secure_url;
            food.cloudinaryPublicId = uploadResult.public_id;
        }

        await food.save();

        res.status(200).json({
            success: true,
            message: "Food item updated successfully",
            data: food
        });
    } catch (error) {
        console.error("updateFood error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update food item"
        });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const query = {};
        if (req.query.category && req.query.category !== "All") {
            query.category = req.query.category;
        }
        if (req.query.available !== undefined) {
            query.isAvailable = req.query.available === "true";
        }

        let foods = [];
        // Only query DB if mongoose is actively connected (readyState === 1) to avoid buffer timeouts
        if (mongoose.connection.readyState === 1) {
            try {
                foods = await foodModel.find(query).sort({ createdAt: -1 });
            } catch (dbErr) {
                console.warn("DB find error, fallback catalog used:", dbErr.message);
            }
        }

        if (!foods || foods.length === 0) {
            foods = fallbackCatalog.filter(f => {
                if (query.category && f.category !== query.category) return false;
                if (query.isAvailable !== undefined && f.isAvailable !== query.isAvailable) return false;
                return true;
            });
        }

        res.status(200).json({ success: true, count: foods.length, data: foods });
    } catch (error) {
        console.error("listFood error:", error);
        res.status(200).json({ success: true, count: fallbackCatalog.length, data: fallbackCatalog });
    }
};

// Get single food item
const getFoodById = async (req, res) => {
    try {
        let food = null;
        if (mongoose.connection.readyState === 1) {
            try {
                food = await foodModel.findById(req.params.id);
            } catch {}
        }
        if (!food) {
            food = fallbackCatalog.find(f => f._id === req.params.id);
        }
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.status(200).json({ success: true, data: food });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching food details" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const foodId = req.params.id || req.body.id;
        if (!foodId) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        if (food.cloudinaryPublicId) {
            try {
                await cloudinary.uploader.destroy(food.cloudinaryPublicId);
            } catch (cleanupErr) {
                console.warn("Cloudinary cleanup error:", cleanupErr.message);
            }
        }

        await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({ success: true, message: "Food item deleted successfully" });
    } catch (error) {
        console.error("removeFood error:", error);
        res.status(500).json({ success: false, message: "Failed to delete food item" });
    }
};

export { addFood, listFood, removeFood, updateFood, getFoodById };
