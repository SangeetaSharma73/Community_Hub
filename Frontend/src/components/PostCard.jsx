import React from "react";
import { BASE_URL } from "../utils/endpoint";

const PostCard = ({ postData, onUserLike, onUserUnlike }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        marginBottom: "20px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff",
        transition: "transform 0.2s",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={
            postData.userId.avatar
              ? `${BASE_URL}${postData.userId.avatar}`
              : "https://via.placeholder.com/40"
          }
          alt="avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div>
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>
            {postData.userId.name}
          </div>
          <div style={{ fontSize: "12px", color: "#777" }}>
            @{postData.userId.username}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "20px",
            backgroundColor:
              postData.postType === "HelpRequest" ? "#e1f5fe" : "#fff8e1",
            color: postData.postType === "HelpRequest" ? "#0277bd" : "#f9a825",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {postData.postType}
        </span>
      </div>

      <h4 style={{ marginBottom: "10px" }}>{postData.title}</h4>
      <p style={{ color: "#444" }}>{postData.description}</p>

      <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
        <button
          onClick={() => onUserLike(postData._id, postData.postType)}
          style={{
            marginRight: "10px",
            padding: "5px 15px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#00c853",
            color: "white",
            cursor: "pointer",
          }}
        >
          👍 Like
        </button>
        <button
          onClick={() => onUserUnlike(postData._id, postData.postType)}
          style={{
            padding: "5px 15px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#d50000",
            color: "white",
            cursor: "pointer",
          }}
        >
          👎 Unlike
        </button>
        <div style={{ marginLeft: "auto", fontSize: "14px", color: "#555" }}>
          ❤️ {postData.likes ? postData.likes.length : 0} Likes
        </div>
      </div>
    </div>
  );
};

export default PostCard;
