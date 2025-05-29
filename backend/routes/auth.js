// backend/routes/auth.js
const express = require("express"); 
const { login, register, logout } = require("../controllers/auth.js");

const router = express.Router();
 
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout); 

module.exports = router;