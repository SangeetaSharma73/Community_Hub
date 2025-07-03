// const express = require("express");
// const { getProfile, updateProfile } = require("../controllers/userController");
// const { protect } = require("../middlewares/authMiddleware");
// const upload = require("../middlewares/uploadMiddleware");

// const router = express.Router();

// router.get("/profile", protect, getProfile);
// router.put("/profile", protect, upload.single("avatar"), updateProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  getUserById,
  getMyProfile,
  updateMyProfile,
  searchUsers,
} = require("../controllers/userController");
const path = require("path");
const multer = require("multer");
// const upload = require("../middlewares/uploadMiddleware");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.put("/me", protect, upload.single("avatar"), updateMyProfile);

router.get("/me", protect, getMyProfile);
// router.put("/me", protect, updateMyProfile);
router.get("/search", searchUsers);
router.get("/:id", getUserById);

module.exports = router;
