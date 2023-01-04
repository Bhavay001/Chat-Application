const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//  sending a message
router.route("/").post(protect, sendMessage);

// fetch all of the messages for that single chat
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
