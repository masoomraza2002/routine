// backend/routes/entries.js
const express = require("express");
const {
    createEntry,
    deleteEntry,
    getEntries, 
    updateEntry,
    getMealsAndRoutines,
} = require("../controllers/entry.js");
const { verifyToken, verifyUser } = require("../middleware/verifyToken.js");
const { verifyEntryOwner } = require("../middleware/verifyOwnership.js");

const router = express.Router();
 
router.post("/", verifyToken, createEntry);
router.put("/:id", verifyToken, verifyEntryOwner, updateEntry);
router.delete("/:id", verifyToken, verifyEntryOwner, deleteEntry);
router.get("/", verifyToken, getEntries);
router.get("/data/fetch/:userId", verifyUser, getMealsAndRoutines);

module.exports = router;