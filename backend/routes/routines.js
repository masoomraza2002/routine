// backend/routes/routines.js
const express = require("express"); // Changed to const syntax
const {
    createRoutine,
    getRoutines, 
    updateRoutine,
    deleteRoutine,
} = require("../controllers/routine.js"); 
const { verifyToken } = require("../middleware/verifyToken.js");
const { verifyRoutineOwner } = require("../middleware/verifyOwnership.js");

const router = express.Router();
 
router.post("/", verifyToken, createRoutine); 
router.put("/:id", verifyToken, verifyRoutineOwner, updateRoutine); 
router.delete("/:id", verifyToken, verifyRoutineOwner, deleteRoutine); 
router.get("/", verifyToken, getRoutines);

module.exports = router;