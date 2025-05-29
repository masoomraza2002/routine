// backend/controllers/entry.js
const Entry = require("../models/Entry.js");
const User = require("../models/User.js");
const Routine = require("../models/Routine.js");
const Meal = require("../models/Meal.js");
const { createError } = require("../utils/error.js");
 
  const createEntry = async (req, res, next) => {
    try { 
        if (!req.user || !req.user.id) {
            return next(createError(401, "User not authenticated."));
        }

        const newEntry = new Entry({
            ...req.body,
            author: req.user.id,  
        });

        const savedEntry = await newEntry.save(); 
        try {
            await User.findByIdAndUpdate(
                req.user.id,  
                { $push: { entries: savedEntry._id } }, 
                { new: true }
            );
        } catch (err) { 
            console.error("Error updating user's entries array:", err); 
        }

        res.status(201).json(savedEntry);
    } catch (err) { 
        if (err.name === 'ValidationError') {
            return next(createError(400, err.message));
        }
        next(createError(500, "Failed to create entry."));
    }
};
 
  const updateEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, 
            { new: true } 
        );
        if (!entry) {
            return next(createError(404, "Entry not found!")); 
        }
        res.status(200).json(entry);
    } catch (err) {
         
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid entry ID format.'));
        }
        next(createError(500, "Failed to update entry."));  
    }
};
 
  const deleteEntry = async (req, res, next) => {
    try {
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
        if (!deletedEntry) {
            return next(createError(404, "Entry not found!")); 
        }
 
        try {
            await User.findByIdAndUpdate(
                deletedEntry.author, 
                { $pull: { entries: deletedEntry._id } },  
                { new: true }
            );
        } catch (err) {
            console.error("Error removing entry = requ"); 
        }

        res.status(200).json({ message: "The entry has been deleted." });  
    } catch (err) { 
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid entry ID format.'));
        }
        next(createError(500, "Failed to delete entry.")); 
    }
};
 
  const getEntries = async (req, res, next) => { 
    const userId = req.user.id;
    try {
        const entries = await Entry.find({ author: userId })
            .populate("meals", "name") 
            .populate("routines", "name"); 

        res.status(200).json(entries);
    } catch (err) {
        next(createError(500, "Failed to retrieve entries.")); 
    }
};
 
  const getMealsAndRoutines = async (req, res, next) => { 
    const userId = req.params.userId;

    try {
        const userRoutines = await Routine.find({ userId: userId }).select("name _id");  
        const userMeals = await Meal.find({ userId: userId }).select("name _id");  

        res.status(200).json({
            routines: userRoutines,
            meals: userMeals,
        });
    } catch (err) {
        next(createError(500, "Failed to retrieve meals and routines.")); 
    }
};
module.exports = {createEntry,getEntries,getMealsAndRoutines,updateEntry,deleteEntry};