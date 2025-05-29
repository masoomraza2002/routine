// backend/routes/meals.js
const express = require("express");
const {
    createMeal,
    deleteMeal,
    getMeals, 
    updateMeal,
} = require("../controllers/meal.js"); //
const { verifyToken } = require("../middleware/verifyToken.js");
const { verifyMealOwner } = require("../middleware/verifyOwnership.js"); //

const router = express.Router();
 
router.post("/", verifyToken, createMeal); 
router.put("/:id", verifyToken, verifyMealOwner, updateMeal); 
router.delete("/:id", verifyToken, verifyMealOwner, deleteMeal); 
router.get("/", verifyToken, getMeals);

module.exports = router;