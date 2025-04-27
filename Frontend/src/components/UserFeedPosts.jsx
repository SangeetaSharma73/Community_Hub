import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { offerHelpEndpoint, requestHelpEndpoint } from "../utils/endpoint";
import { deleteData } from "../services/httpMethods"; // Import deleteData

const UserFeedPosts = ({ posts, refreshPosts }) => {
  const navigate = useNavigate();

  const onDelete = async (post) => {
    try {
      // Construct the appropriate endpoint with the post._id
      const endpoint =
        post.postType === "HelpOffer" ? offerHelpEndpoint : requestHelpEndpoint;

      // Call the deleteData function with the endpoint and post._id (id)
      await deleteData(endpoint, post._id);

      // After successful deletion, refresh the posts
      refreshPosts();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const onEdit = (post) => {
    navigate(`/edit-post/${post._id}`, { state: { postType: post.postType } });
  };

  return (
    <div className="mt-6 space-y-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-start"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">
              {post.postType === "HelpOffer" ? "Help Offer" : "Help Request"} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="text-md font-medium capitalize">Type: {post.type}</p>
            <p className="text-sm text-gray-700 mt-1">{post.description}</p>
          </div>

          <div className="flex flex-col items-end gap-2 ml-4">
            <button
              onClick={() => onEdit(post)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={() => onDelete(post)} // Call onDelete to delete the post
              className="text-red-600 hover:text-red-800"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFeedPosts;
