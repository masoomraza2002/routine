// backend/controllers/user.js
const User = require("../models/User.js");
const { createError } = require("../utils/error.js");
 
  const updateUser = async (req, res, next) => { 
    if (req.user?.id === req.params.id || req.user?.isAdmin) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },  
                { new: true }  
            );

            if (!updatedUser) {
                return next(createError(404, "User not found!"));
            }
 
            const { password, ...otherDetails } = updatedUser._doc;
            res.status(200).json(otherDetails);
        } catch (err) {
            next(createError(500, "Failed to update user.")); 
        }
    } else { 
        next(createError(403, "You are not allowed to update this user."));
    }
};
 
  const deleteUser = async (req, res, next) => {
    if (req.user?.id === req.params.id || req.user?.isAdmin) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);

            if (!deletedUser) {
                return next(createError(404, "User not found!"));
            }

            res.status(200).json({ message: "User has been deleted." });
        } catch (err) {
            next(createError(500, "Failed to delete user.")); 
        }
    } else {
        next(createError(403, "You are not allowed to delete this user."));
    }
};
 
  const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("routines")
            .populate("entries")
            .populate("meals");

        if (!user) {
            return next(createError(404, "User not found."));  
        }
 
        const { password, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails);
    } catch (err) { 
        if (err.name === 'CastError') {
            return next(createError(400, 'Invalid user ID format.'));
        }
        next(createError(500, "Failed to retrieve user.")); 
    }
};
 
  const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); 
        const usersWithoutPasswords = users.map(user => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        });
        res.status(200).json(usersWithoutPasswords);
    } catch (err) {
        next(createError(500, "Failed to retrieve users."));  
    }
};
module.exports = {getUser , updateUser ,deleteUser ,getUsers };