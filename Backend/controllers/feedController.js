const HelpRequest = require("../models/HelpRequest");
const HelpOffer = require("../models/HelpOffer");
const Like = require("../models/Like");
const User = require("../models/User");

const getCommonFields = (doc, type) => ({
  ...doc.toObject(),
  postType: type,
});

// GET /feed
exports.getFeed = async (req, res) => {
  try {
    const requests = await HelpRequest.find()
      .populate("userId", "name username avatar")
      .lean();
    const offers = await HelpOffer.find()
      .populate("userId", "name username avatar")
      .lean();

    const posts = [
      ...requests.map((post) => ({ ...post, postType: "HelpRequest" })),
      ...offers.map((post) => ({ ...post, postType: "HelpOffer" })),
    ];

    // Sort by createdAt descending
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Error loading feed" });
  }
};

// GET /feed/:id
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await HelpRequest.findById(id).populate(
      "userId",
      "name username avatar"
    );
    if (post) return res.json(getCommonFields(post, "HelpRequest"));

    post = await HelpOffer.findById(id).populate(
      "userId",
      "name username avatar"
    );
    if (post) return res.json(getCommonFields(post, "HelpOffer"));

    res.status(404).json({ msg: "Post not found" });
  } catch (err) {
    res.status(500).json({ msg: "Error retrieving post" });
  }
};

// POST /feed/:id/like
exports.likePost = async (req, res) => {
  const { id } = req.params;
  const { postType } = req.body;

  try {
    await Like.findOneAndUpdate(
      { userId: req.user.id, postId: id, postType },
      { userId: req.user.id, postId: id, postType },
      { upsert: true, new: true }
    );
    res.json({ msg: "Liked" });
  } catch (err) {
    res.status(400).json({ msg: "Failed to like" });
  }
};

// POST /feed/:id/unlike
exports.unlikePost = async (req, res) => {
  const { id } = req.params;
  const { postType } = req.body;

  try {
    await Like.findOneAndDelete({ userId: req.user.id, postId: id, postType });
    res.json({ msg: "Unliked" });
  } catch (err) {
    res.status(400).json({ msg: "Failed to unlike" });
  }
};
