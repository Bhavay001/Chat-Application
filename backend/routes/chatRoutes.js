const express = require("express");
const {
  accessChat,
  createGroupChat,
  fetchChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// this route is for accessing the chat or creaitng a chat
router.route("/").post(protect, accessChat);
// get all of the chat of that user from database
router.route("/").get(protect, fetchChat);

router.route("/group").post(protect, createGroupChat);
// rename a group chat
router.route("/rename").put(protect, renameGroup);
// for removing someone or leaving from the group
router.route("/groupremove").put(protect, removeFromGroup);
// add someone to the gropu
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
