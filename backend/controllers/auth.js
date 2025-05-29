// backend/controllers/auth.js
const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
 
const generateToken = (user) => { 
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT,  
        { expiresIn: "7d" }  
    );
}; 

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
 
  const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body; 
 
        if (!username || !email || !password) {
            return next(createError(400, "All fields (username, email, password) are required."));
        }
 
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return next(createError(409, "User with given email already exists."));
        }
 
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return next(createError(409, "Username already taken."));
        }
 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
 
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            
        });
 
        await newUser.save();
 
        const token = generateToken(newUser);
 
        const { password: pwd, ...otherDetails } = newUser._doc;
 
        res.cookie("access_token", token, cookieOptions)
            .status(201)
            .json({ details: { ...otherDetails } }); 
    } catch (err) { 
        next(createError(500, "Registration failed. Please try again."));
    }
};
 
  const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
 
        if (!username || !password) {
            return next(createError(400, "Username and password are required."));
        }
 
        const user = await User.findOne({ username });
        if (!user) {
            return next(createError(404, "User not found!"));
        }
 
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username!"));
        }
 
        const token = generateToken(user);
 
        const { password: pwd, ...otherDetails } = user._doc;
 
        res.cookie("access_token", token, cookieOptions)
            .status(200)
            .json({ details: { ...otherDetails } }); 
    } catch (err) { 
        next(createError(500, "Login failed. Please try again.")); 
    }
}; 
  const logout = (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        }).status(200).json({ message: "Logged out successfully." });
    } catch (err) {
        next(createError(500, "Logout failed."));
    }
};
module.exports = {logout,login , register};