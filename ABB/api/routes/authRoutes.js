
const express = require('express');
const router = express.Router();
const { createUser, loginUser, deleteUser, getAllUsers, getUserById, updateUser ,logout} = require('../controllers/userController');
const  {requireAutho}  = require('../middlewares/authMiddleware');

// Apply requireAuth only to specific routes that require authentication
router.post("/register", createUser);
router.post("/login",loginUser);
router.post("/logout",logout);

router.delete("/deleteuser",requireAutho, deleteUser);
router.get("/getallusers",requireAutho, getAllUsers);
router.get("/getauser",requireAutho, getUserById);
router.put("/updateuser", requireAutho,updateUser);

module.exports = router;