const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// // for registration
router.route("/").post(registerUser).get(protect, allUsers);
// // for login
router.post("/login", authUser);

module.exports = router;
