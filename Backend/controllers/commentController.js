const Comment = require("../models/Comment");

// POST /comments — Add a comment or reply
exports.addComment = async (req, res) => {
  try {
    const { postId, postType, content, parentId } = req.body;

    const comment = new Comment({
      postId,
      postType,
      userId: req.user.id,
      content,
      parentId: parentId || null,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ msg: "Failed to add comment", error: err.message });
  }
};

// GET /comments/:postId — Get nested comments tree
const buildTree = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c._id] = { ...c.toObject(), children: [] };
  });

  comments.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.children.push(map[c._id]);
    } else {
      roots.push(map[c._id]);
    }
  });

  return roots;
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "name username avatar")
      .sort({ createdAt: 1 });

    const tree = buildTree(comments);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load comments" });
  }
};

// PUT /comments/:id — Edit comment
exports.editComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { content: req.body.content },
      { new: true }
    );
    if (!comment)
      return res.status(404).json({ msg: "Comment not found or unauthorized" });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ msg: "Failed to update comment" });
  }
};

// DELETE /comments/:id — Recursive delete
const deleteWithChildren = async (commentId) => {
  const children = await Comment.find({ parentId: commentId });
  for (const child of children) {
    await deleteWithChildren(child._id);
  }
  await Comment.findByIdAndDelete(commentId);
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!comment)
      return res.status(404).json({ msg: "Comment not found or unauthorized" });

    await deleteWithChildren(comment._id);
    res.json({ msg: "Comment and replies deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Failed to delete comment" });
  }
};
