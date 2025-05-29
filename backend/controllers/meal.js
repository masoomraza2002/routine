// backend/controllers/meal.js
const Meal = require("../models/Meal.js");
const User  = require("../models/User.js");
const { createError }  = require("../utils/error.js");
 
  const createMeal = async (req, res, next) => {
    try { 
        if (!req.user || !req.user.id) {
            return next(createError(401, "User not authenticated."));
        }

        const newMeal = new Meal({
            ...req.body,
            userId: req.user.id,  
        });

        const savedMeal = await newMeal.save();
 
        try {
            await User.findByIdAndUpdate(
                req.user.id,  
                { $push: { meals: savedMeal._id } },  
                { new: true }
            );
        } catch (err) {
            console.error("Error updating user's meals array:", err); 
        }

        res.status(201).json(savedMeal); 
    } catch (err) { 
        if (err.name === 'ValidationError') {
            return next(createError(400, err.message));
        }
        next(createError(500, "Failed to create meal."));
    }
};
 
  const updateMeal = async (req, res, next) => {
    try {
        const meal = await Meal.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },  
            { new: true }  
        );
        if (!meal) {
            return next(createError(404, "Meal not found!"));  
        }
        res.status(200).json(meal);
    } catch (err) { 
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid meal ID format.'));
        }
        next(createError(500, "Failed to update meal.")); 
    }
};
 
  const deleteMeal = async (req, res, next) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
        if (!deletedMeal) {
            return next(createError(404, "Meal not found!"));  
        } 
        try {
            await User.findByIdAndUpdate(
                deletedMeal.userId,  
                { $pull: { meals: deletedMeal._id } }, 
                { new: true }
            );
        } catch (err) {
            console.error("Error removing meal from user's array:", err);
        }

        res.status(200).json({ message: "The meal has been deleted." });
    } catch (err) { 
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid meal ID format.'));
        }
        next(createError(500, "Failed to delete meal."));  
    }
}; 
  const getMeals = async (req, res, next) => { 
    const userId = req.user.id;
    try {
        const meals = await Meal.find({ userId: userId });  
        res.status(200).json(meals);
    } catch (err) {
        next(createError(500, "Failed to retrieve meals.")); 
    }
};
module.exports = {createMeal,getMeals,updateMeal,deleteMeal};