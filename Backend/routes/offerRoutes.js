const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  getMyOffers,
} = require("../controllers/helpOfferController");

router.post("/", protect, createOffer);
router.get("/", getAllOffers);
router.get("/:id", getOfferById);
router.put("/:id", protect, updateOffer);
router.delete("/:id", protect, deleteOffer);
router.get("/my", protect, getMyOffers); // NEW route

module.exports = router;
