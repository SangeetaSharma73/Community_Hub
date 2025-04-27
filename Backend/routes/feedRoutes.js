const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  getFeed,
  getPostById,
  likePost,
  unlikePost,
} = require("../controllers/feedController");

router.get("/", getFeed);
router.get("/:id", getPostById);
router.post("/:id/like", protect, likePost);
router.post("/:id/unlike", protect, unlikePost);

module.exports = router;
