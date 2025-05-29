// backend/middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");
 
  const verifyToken = (req, res, next) => {  
    const authHeader = req.headers.authorization;
    const token =
        req.cookies?.access_token ||
        (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    } 
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT;

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user; 
        next();
    });
}; 
  const verifyUser = (req, res, next) => { 
    verifyToken(req, res, () => { 
        if (req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not authorized to access this resource!"));
        }
    });
};
 
  const verifyAdmin = (req, res, next) => { 
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not authorized as an admin!"));
        }
    });
};


module.exports = {verifyAdmin,verifyToken,verifyUser};