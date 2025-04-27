const mongoose = require("mongoose");

const HelpOfferSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["medical", "food", "transport", "other"],
    required: true,
  },
  description: String,
  availability: { type: String },
  range: Number,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

HelpOfferSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("HelpOffer", HelpOfferSchema);
