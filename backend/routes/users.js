// backend/routes/users.js
const  express = require("express");
const  {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} = require("../controllers/user.js" );
const  { verifyToken, verifyUser, verifyAdmin } = require("../middleware/verifyToken.js");

const router = express.Router();
 
router.put("/:id", verifyUser, updateUser); 
router.delete("/:id", verifyUser, deleteUser); 
router.get("/:id", verifyUser, getUser); 
router.get("/", verifyAdmin, getUsers);

module.exports = router;
