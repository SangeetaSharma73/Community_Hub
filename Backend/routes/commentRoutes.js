const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  addComment,
  getCommentsByPost,
  editComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", protect, addComment);
router.get("/:postId", getCommentsByPost);
router.put("/:id", protect, editComment);
router.delete("/:id", protect, deleteComment);

module.exports = router;
