const HelpOffer = require("../models/HelpOffer");

// Create Help Offer
exports.createOffer = async (req, res) => {
  try {
    const offer = new HelpOffer({
      ...req.body,
      userId: req.user.id,
    });
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Failed to create help offer", error: err.message });
  }
};

// Get All Offers (filterable)
exports.getAllOffers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;

    const offers = await HelpOffer.find(filter).populate(
      "userId",
      "name email"
    );
    res.json(offers);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching help offers" });
  }
};

// Get Single Offer
exports.getOfferById = async (req, res) => {
  try {
    const offer = await HelpOffer.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!offer) return res.status(404).json({ msg: "Offer not found" });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching offer" });
  }
};

// Update Help Offer
exports.updateOffer = async (req, res) => {
  try {
    const updated = await HelpOffer.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ msg: "Offer not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: "Failed to update offer" });
  }
};

// Delete Help Offer
exports.deleteOffer = async (req, res) => {
  try {
    const deleted = await HelpOffer.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted)
      return res.status(404).json({ msg: "Offer not found or unauthorized" });
    res.json({ msg: "Offer deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Failed to delete offer" });
  }
};

// Get My Help Offers
exports.getMyOffers = async (req, res) => {
  try {
    const offers = await HelpOffer.find({ userId: req.user.id });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching your help offers" });
  }
};
