import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Food name is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Food description is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Food price is required"],
            min: [0, "Price must be a positive number"]
        },
        image: {
            type: String,
            required: [true, "Food image URL is required"]
        },
        cloudinaryPublicId: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        isVeg: {
            type: Boolean,
            default: true
        },
        prepTime: {
            type: String,
            default: "20-25 mins",
            trim: true
        },
        calories: {
            type: String,
            default: "350 kcal",
            trim: true
        },
        rating: {
            type: Number,
            default: 4.8
        }
    },
    {
        timestamps: true
    }
);

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
