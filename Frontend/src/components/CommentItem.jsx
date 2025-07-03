import React, { useState } from "react";

// Helper function to count nested replies for each comment
const countReplies = (comment) => {
  if (!comment.children || comment.children.length === 0) {
    return 0;
  }

  let count = comment.children.length;
  for (let child of comment.children) {
    count += countReplies(child); // Recursively count all replies
  }

  return count;
};

const CommentItem = ({ comment, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSubmit = () => {
    if (replyText.trim()) {
      onReply(comment._id, replyText);
      setReplyText("");
      setShowReply(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: 16,
        marginLeft: comment.parentId ? 48 : 0,
      }}
    >
      <img
        src={
          comment.userId.avatar ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt="avatar"
        style={{ width: 36, height: 36, borderRadius: "50%", marginRight: 12 }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: "#f3f2ef",
            borderRadius: 8,
            padding: "10px 12px",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14 }}>
            {comment.userId.name}
          </div>
          <div style={{ fontSize: 13, color: "#333" }}>{comment.content}</div>
        </div>
        <button
          onClick={() => setShowReply(!showReply)}
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "#0073b1",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reply
        </button>

        {/* Nested Comment Count */}
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            color: "#555",
            fontWeight: "bold",
          }}
        >
          {countReplies(comment)}{" "}
          {countReplies(comment) === 1 ? "Reply" : "Replies"}
        </div>

        {showReply && (
          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 12,
                border: "1px solid #ccc",
                fontSize: 13,
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                marginTop: 6,
                backgroundColor: "#0073b1",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: 12,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Post
            </button>
          </div>
        )}

        {comment.children?.map((child) => (
          <CommentItem key={child._id} comment={child} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

export default CommentItem;
