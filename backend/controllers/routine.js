// backend/controllers/routine.js
const Routine = require("../models/Routine.js");
const User = require("../models/User.js");
const { createError } = require("../utils/error.js");
 
  const createRoutine = async (req, res, next) => {
    try { 
        if (!req.user || !req.user.id) {
            return next(createError(401, "User not authenticated."));
        }

        const newRoutine = new Routine({
            ...req.body,
            userId: req.user.id,  
        });

        const savedRoutine = await newRoutine.save();
 
        try {
            await User.findByIdAndUpdate(
                req.user.id, 
                { $push: { routines: savedRoutine._id } },  
                { new: true }
            );
        } catch (err) {
            console.error("Error updating user's routines array:", err); 
        }

        res.status(201).json(savedRoutine);  
    } catch (err) { 
        if (err.name === 'ValidationError') {
            return next(createError(400, err.message));
        }
        next(createError(500, "Failed to create routine."));
    }
};
 
  const getRoutines = async (req, res, next) => { 
    const userId = req.user.id;
    try {
        const routines = await Routine.find({ userId: userId });  
        res.status(200).json(routines);
    } catch (err) {
        next(createError(500, "Failed to retrieve routines."));  
    }
};
 
  const updateRoutine = async (req, res, next) => {
    try {
        const routine = await Routine.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },  
            { new: true }  
        );
        if (!routine) {
            return next(createError(404, "Routine not found!"));  
        }
        res.status(200).json(routine);
    } catch (err) { 
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid routine ID format.'));
        }
        next(createError(500, "Failed to update routine.")); 
    }
};
 
  const deleteRoutine = async (req, res, next) => {
    try {
        const deletedRoutine = await Routine.findByIdAndDelete(req.params.id);
        if (!deletedRoutine) {
            return next(createError(404, "Routine not found!"));  
        }
 
        try {
            await User.findByIdAndUpdate(
                deletedRoutine.userId, 
                { $pull: { routines: deletedRoutine._id } },  
                { new: true }
            );
        } catch (err) {
            console.error("Error removing routine = requ");
        }

        res.status(200).json({ message: "The routine has been deleted." });  
    } catch (err) { 
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid routine ID format.'));
        }
        next(createError(500, "Failed to delete routine."));  
    }
};


module.exports = {createRoutine,getRoutines,updateRoutine,deleteRoutine};