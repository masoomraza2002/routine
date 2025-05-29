// backend/middleware/verifyOwnership.js
const { createError } = require("../utils/error.js");
const Entry = require("../models/Entry.js");
const Routine = require("../models/Routine.js");
const Meal = require("../models/Meal.js");
 
  const verifyOwnership = (Model) => {
    return async (req, res, next) => {
        try {
            const resource = await Model.findById(req.params.id);
            if (!resource) {
                return next(createError(404, "Resource not found!"));
            }
 
            if (!req.user) {
                return next(createError(401, "Authentication required for ownership check!"));
            }
 
            if (req.user.id === resource.userId.toString() || req.user.isAdmin) {
                next(); 
            } else { 
                return next(createError(403, "You are not authorized to access this resource!"));
            }
        } catch (err) {
           
            if (err.name === 'CastError') {
                return next(createError(400, 'Invalid resource ID format.'));
            }
            
            next(createError(500, "Failed to verify resource ownership."));
        }
    };
};
 
  const verifyEntryOwner = verifyOwnership(Entry);
  const verifyMealOwner = verifyOwnership(Meal);
  const verifyRoutineOwner = verifyOwnership(Routine);


module.exports = {verifyOwnership , verifyEntryOwner,verifyMealOwner,verifyRoutineOwner};