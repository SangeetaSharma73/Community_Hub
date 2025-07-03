// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import { BASE_URL } from "../utils/endpoint";
// // import CommentItem from "./CommentItem";

// // const PostCard = ({ postData, onUserLike, onUserUnlike }) => {
// //   const [comments, setComments] = useState([]);
// //   const [newComment, setNewComment] = useState("");
// //   const [showComments, setShowComments] = useState(false);

// //   const token = localStorage.getItem("token");

// //   const fetchComments = async () => {
// //     try {
// //       const res = await axios.get(`${BASE_URL}/api/comments/${postData._id}`);
// //       setComments(res.data);
// //     } catch (error) {
// //       console.error("Failed to fetch comments", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchComments();
// //   }, [postData._id]);

// //   const handleAddComment = async (parentId = null, content = newComment) => {
// //     try {
// //       await axios.post(
// //         `${BASE_URL}/api/comments`,
// //         {
// //           postId: postData._id,
// //           postType: postData.postType,
// //           content,
// //           parentId,
// //         },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       fetchComments();
// //       if (!parentId) setNewComment("");
// //     } catch (err) {
// //       console.error("Failed to post comment", err);
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         border: "1px solid #ddd",
// //         borderRadius: "8px",
// //         marginBottom: "24px",
// //         boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
// //         backgroundColor: "#fff",
// //         padding: "16px",
// //       }}
// //     >
// //       {/* Header */}
// //       <div style={{ display: "flex", alignItems: "center" }}>
// //         <Link to="/profile">
// //           <img
// //             src={
// //               postData?.userId?.avatar
// //                 ? `${BASE_URL}${postData?.userId?.avatar}`
// //                 : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
// //             }
// //             alt="avatar"
// //             style={{
// //               width: 48,
// //               height: 48,
// //               borderRadius: "50%",
// //               marginRight: 12,
// //               objectFit: "cover",
// //             }}
// //           />
// //         </Link>
// //         <div>
// //           <div style={{ fontWeight: 600, fontSize: 16 }}>
// //             {postData.userId.name}
// //           </div>
// //           <div style={{ fontSize: 13, color: "#666" }}>
// //             @{postData.userId.username}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Post Type and Content */}
// //       <div style={{ marginTop: 12 }}>
// //         <span
// //           style={{
// //             display: "inline-block",
// //             padding: "4px 10px",
// //             borderRadius: 12,
// //             backgroundColor:
// //               postData.postType === "HelpRequest" ? "#e1f5fe" : "#fff8e1",
// //             color: postData.postType === "HelpRequest" ? "#0277bd" : "#f9a825",
// //             fontSize: 12,
// //             fontWeight: 600,
// //           }}
// //         >
// //           {postData.postType}
// //         </span>

// //         <h3 style={{ margin: "10px 0 6px", fontSize: 18 }}>{postData.title}</h3>
// //         <p style={{ fontSize: 14.5, color: "#333", lineHeight: 1.6 }}>
// //           {postData.description}
// //         </p>
// //       </div>

// //       {/* Reaction Buttons */}
// //       <div
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           marginTop: 16,
// //           borderTop: "1px solid #eee",
// //           paddingTop: 10,
// //         }}
// //       >
// //         <button
// //           onClick={() => onUserLike(postData._id, postData.postType)}
// //           style={{
// //             background: "none",
// //             border: "none",
// //             color: "#0073b1",
// //             fontWeight: 600,
// //             cursor: "pointer",
// //             marginRight: 16,
// //           }}
// //         >
// //           👍 Like
// //         </button>

// //         <button
// //           onClick={() => setShowComments((prev) => !prev)}
// //           style={{
// //             background: "none",
// //             border: "none",
// //             color: "#0073b1",
// //             fontWeight: 600,
// //             cursor: "pointer",
// //           }}
// //         >
// //           💬 Comment
// //         </button>

// //         <div style={{ marginLeft: "auto", fontSize: 14, color: "#555" }}>
// //           💬 {comments.length} Comments
// //         </div>
// //       </div>

// //       {/* Comment Input + Comments Section */}
// //       {showComments && (
// //         <div style={{ marginTop: 20 }}>
// //           {/* Add Comment */}
// //           <input
// //             type="text"
// //             value={newComment}
// //             onChange={(e) => setNewComment(e.target.value)}
// //             placeholder="Add a public comment..."
// //             style={{
// //               width: "100%",
// //               padding: "12px",
// //               borderRadius: "20px",
// //               border: "1px solid #ccc",
// //               fontSize: 14,
// //               marginBottom: 10,
// //             }}
// //           />
// //           <button
// //             onClick={() => handleAddComment()}
// //             style={{
// //               backgroundColor: "#0073b1",
// //               color: "#fff",
// //               padding: "8px 16px",
// //               borderRadius: "20px",
// //               border: "none",
// //               cursor: "pointer",
// //               fontWeight: 600,
// //               marginBottom: 20,
// //             }}
// //           >
// //             Comment
// //           </button>

// //           {/* Comments List */}
// //           {comments.map((comment) => (
// //             <CommentItem
// //               key={comment._id}
// //               comment={comment}
// //               onReply={handleAddComment}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PostCard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../utils/endpoint";
// import CommentItem from "./CommentItem";

// // Helper function to count nested comments
// const countNestedComments = (comment) => {
//   if (!comment.children || comment.children.length === 0) {
//     return 0;
//   }

//   let count = comment.children.length;
//   for (let child of comment.children) {
//     count += countNestedComments(child); // Recursively count all nested comments
//   }

//   return count;
// };

// const PostCard = ({ postData, onUserLike, onUserUnlike }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [showComments, setShowComments] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/comments/${postData._id}`);
//       setComments(res.data);
//     } catch (error) {
//       console.error("Failed to fetch comments", error);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [postData._id]);

//   const handleAddComment = async (parentId = null, content = newComment) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/api/comments`,
//         {
//           postId: postData._id,
//           postType: postData.postType,
//           content,
//           parentId,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchComments();
//       if (!parentId) setNewComment("");
//     } catch (err) {
//       console.error("Failed to post comment", err);
//     }
//   };

//   // Count all nested comments
//   const totalNestedComments = comments.reduce((acc, comment) => {
//     return acc + countNestedComments(comment);
//   }, comments.length); // Include direct comments as well

//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         marginBottom: "24px",
//         boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//         backgroundColor: "#fff",
//         padding: "16px",
//       }}
//     >
//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <Link to="/profile">
//           <img
//             src={
//               postData?.userId?.avatar
//                 ? `${BASE_URL}${postData?.userId?.avatar}`
//                 : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//             }
//             alt="avatar"
//             style={{
//               width: 48,
//               height: 48,
//               borderRadius: "50%",
//               marginRight: 12,
//               objectFit: "cover",
//             }}
//           />
//         </Link>
//         <div>
//           <div style={{ fontWeight: 600, fontSize: 16 }}>
//             {postData.userId.name}
//           </div>
//           <div style={{ fontSize: 13, color: "#666" }}>
//             @{postData.userId.username}
//           </div>
//         </div>
//       </div>

//       {/* Post Type and Content */}
//       <div style={{ marginTop: 12 }}>
//         <span
//           style={{
//             display: "inline-block",
//             padding: "4px 10px",
//             borderRadius: 12,
//             backgroundColor:
//               postData.postType === "HelpRequest" ? "#e1f5fe" : "#fff8e1",
//             color: postData.postType === "HelpRequest" ? "#0277bd" : "#f9a825",
//             fontSize: 12,
//             fontWeight: 600,
//           }}
//         >
//           {postData.postType}
//         </span>

//         <h3 style={{ margin: "10px 0 6px", fontSize: 18 }}>{postData.title}</h3>
//         <p style={{ fontSize: 14.5, color: "#333", lineHeight: 1.6 }}>
//           {postData.description}
//         </p>
//       </div>

//       {/* Reaction Buttons */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           marginTop: 16,
//           borderTop: "1px solid #eee",
//           paddingTop: 10,
//         }}
//       >
//         <button
//           onClick={() => onUserLike(postData._id, postData.postType)}
//           style={{
//             background: "none",
//             border: "none",
//             color: "#0073b1",
//             fontWeight: 600,
//             cursor: "pointer",
//             marginRight: 16,
//           }}
//         >
//           👍 Like
//         </button>

//         <button
//           onClick={() => setShowComments((prev) => !prev)}
//           style={{
//             background: "none",
//             border: "none",
//             color: "#0073b1",
//             fontWeight: 600,
//             cursor: "pointer",
//           }}
//         >
//           💬 Comment
//         </button>

//         <div style={{ marginLeft: "auto", fontSize: 14, color: "#555" }}>
//           💬 {totalNestedComments} Comments
//         </div>
//       </div>

//       {/* Comment Input + Comments Section */}
//       {showComments && (
//         <div style={{ marginTop: 20 }}>
//           {/* Add Comment */}
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a public comment..."
//             style={{
//               width: "100%",
//               padding: "12px",
//               borderRadius: "20px",
//               border: "1px solid #ccc",
//               fontSize: 14,
//               marginBottom: 10,
//             }}
//           />
//           <button
//             onClick={() => handleAddComment()}
//             style={{
//               backgroundColor: "#0073b1",
//               color: "#fff",
//               padding: "8px 16px",
//               borderRadius: "20px",
//               border: "none",
//               cursor: "pointer",
//               fontWeight: 600,
//               marginBottom: 20,
//             }}
//           >
//             Comment
//           </button>

//           {/* Comments List */}
//           {comments.map((comment) => (
//             <CommentItem
//               key={comment._id}
//               comment={comment}
//               onReply={handleAddComment}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/endpoint";
import CommentItem from "./CommentItem";

// Helper function to count nested comments
const countNestedComments = (comment) => {
  if (!comment.children || comment.children.length === 0) return 0;

  let count = comment.children.length;
  for (let child of comment.children) {
    count += countNestedComments(child);
  }

  return count;
};

const PostCard = ({ postData, onEditPost, onDeletePost }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const token = localStorage.getItem("token");

  // Local states for like/unlike
  const [likes, setLikes] = useState(postData.likes || []);
  const [unlikes, setUnlikes] = useState(postData.unlikes || []);
  const [isLiked, setIsLiked] = useState(
    postData.isLikedByCurrentUser || false
  );
  const [isUnliked, setIsUnliked] = useState(
    postData.isUnlikedByCurrentUser || false
  );

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/comments/${postData._id}`);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postData._id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddComment = async (parentId = null, content = newComment) => {
    try {
      await axios.post(
        `${BASE_URL}/api/comments`,
        {
          postId: postData._id,
          postType: postData.postType,
          content,
          parentId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
      if (!parentId) setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleLike = async () => {
    try {
      if (!isLiked) {
        setLikes((prev) => [...prev, postData.currentUserId]);
        setIsLiked(true);
        if (isUnliked) {
          setUnlikes((prev) =>
            prev.filter((id) => id !== postData.currentUserId)
          );
          setIsUnliked(false);
        }

        await axios.post(
          `${BASE_URL}/api/like`,
          { postId: postData._id, postType: postData.postType },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("Failed to like", err);
    }
  };

  const handleUnlike = async () => {
    try {
      if (!isUnliked) {
        setUnlikes((prev) => [...prev, postData.currentUserId]);
        setIsUnliked(true);
        if (isLiked) {
          setLikes((prev) =>
            prev.filter((id) => id !== postData.currentUserId)
          );
          setIsLiked(false);
        }

        await axios.post(
          `${BASE_URL}/api/unlike`,
          { postId: postData._id, postType: postData.postType },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("Failed to unlike", err);
    }
  };

  const totalNestedComments = comments.reduce((acc, comment) => {
    return acc + countNestedComments(comment);
  }, comments.length);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "24px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        padding: "16px",
        position: "relative",
      }}
    >
      {/* Three-dot menu */}
      <div ref={menuRef} style={{ position: "absolute", top: 12, right: 12 }}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ⋮
        </button>
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 6,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              zIndex: 10,
              minWidth: 120,
            }}
          >
            <div
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 14,
              }}
              onClick={() => {
                setMenuOpen(false);
                onEditPost(postData);
              }}
            >
              ✏️ Edit
            </div>
            <div
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                color: "red",
                fontSize: 14,
              }}
              onClick={() => {
                setMenuOpen(false);
                onDeletePost(postData._id);
              }}
            >
              🗑️ Delete
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/profile">
          <img
            src={
              postData?.userId?.avatar
                ? `${BASE_URL}${postData?.userId?.avatar}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="avatar"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              marginRight: 12,
              objectFit: "cover",
            }}
          />
        </Link>
        <div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>
            {postData.userId.name}
          </div>
          <div style={{ fontSize: 13, color: "#666" }}>
            @{postData.userId.username}
          </div>
        </div>
      </div>

      {/* Post Type and Content */}
      <div style={{ marginTop: 12 }}>
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: 12,
            backgroundColor:
              postData.postType === "HelpRequest" ? "#e1f5fe" : "#fff8e1",
            color: postData.postType === "HelpRequest" ? "#0277bd" : "#f9a825",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {postData.postType}
        </span>

        <h3 style={{ margin: "10px 0 6px", fontSize: 18 }}>{postData.title}</h3>
        <p style={{ fontSize: 14.5, color: "#333", lineHeight: 1.6 }}>
          {postData.description}
        </p>
      </div>

      {/* Reaction Counts */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 16,
          padding: "8px 0",
          borderBottom: "1px solid #eee",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        <span>👍 Likes: {likes.length}</span>
        <span>👎 Unlikes: {unlikes.length}</span>
      </div>

      {/* Reaction Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <button
          onClick={handleLike}
          disabled={isLiked}
          style={{
            background: isLiked ? "#e0f7fa" : "none",
            border: "1px solid #ccc",
            borderRadius: "20px",
            padding: "6px 16px",
            marginRight: 10,
            cursor: isLiked ? "not-allowed" : "pointer",
            fontWeight: 600,
            color: "#0073b1",
          }}
        >
          👍 Like
        </button>

        <button
          onClick={handleUnlike}
          disabled={isUnliked}
          style={{
            background: isUnliked ? "#fbe9e7" : "none",
            border: "1px solid #ccc",
            borderRadius: "20px",
            padding: "6px 16px",
            marginRight: 10,
            cursor: isUnliked ? "not-allowed" : "pointer",
            fontWeight: 600,
            color: "#d32f2f",
          }}
        >
          👎 Unlike
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#0073b1",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          💬 Comment
        </button>

        <div style={{ marginLeft: "auto", fontSize: 14, color: "#555" }}>
          💬 {totalNestedComments} Comments
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div style={{ marginTop: 20 }}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a public comment..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              fontSize: 14,
              marginBottom: 10,
            }}
          />
          <button
            onClick={() => handleAddComment()}
            style={{
              backgroundColor: "#0073b1",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Comment
          </button>

          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={handleAddComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
