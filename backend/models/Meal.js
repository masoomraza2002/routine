// backend/models/Meal.js
const mongoose =  require("mongoose");

const MealSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
        },
        recipe: { 
            type: String,
            default: "",
            trim: true,
        },
        time: { 
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        category: { 
            type: String,
            required: true,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Other'],
            default: 'Other',
        }, 
    },
    { timestamps: true } 
);

const Meal =  mongoose.model("Meal", MealSchema); 
module.exports = Meal;