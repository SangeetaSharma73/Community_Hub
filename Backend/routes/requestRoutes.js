const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getMyRequests,
  getNearbyRequests,
} = require("../controllers/helpRequestController");

router.post("/", protect, createRequest);
router.get("/", getAllRequests);
router.get("/:id", getRequestById);
router.put("/:id", protect, updateRequest);
router.delete("/:id", protect, deleteRequest);
router.get("/my", protect, getMyRequests); // NEW route
//near location
router.get("/nearby", protect, getNearbyRequests);
module.exports = router;
