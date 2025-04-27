const mongoose = require("mongoose");

const HelpRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["medical", "food", "transport", "other"],
    required: true,
  },
  description: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "closed"],
    default: "open",
  },
  createdAt: { type: Date, default: Date.now },
});

HelpRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("HelpRequest", HelpRequestSchema);
