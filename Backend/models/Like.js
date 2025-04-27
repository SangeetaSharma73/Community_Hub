const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postType: {
      type: String,
      enum: ["HelpRequest", "HelpOffer"],
      required: true,
    },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

LikeSchema.index({ userId: 1, postId: 1, postType: 1 }, { unique: true });

module.exports = mongoose.model("Like", LikeSchema);
