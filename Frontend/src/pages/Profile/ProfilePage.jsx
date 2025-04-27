import { useEffect, useState } from "react";
import { getData, updateData } from "../../services/httpMethods";
import {
  BASE_URL,
  getProfileDetails,
  getUserFeedEndpoint,
  offerHelpEndpoint,
  requestHelpEndpoint,
} from "../../utils/endpoint";
import UserFeedPosts from "../../components/UserFeedPosts";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [feedError, setFeedError] = useState("");

  const [editingPost, setEditingPost] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await getData(getProfileDetails);
      setUserDetails(response);
    } catch (err) {
      setErrorMessage(err?.response?.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFeeds = async () => {
    setIsLoadingFeed(true);
    setFeedError("");
    try {
      const response = await getData(getUserFeedEndpoint, false);
      const filtered = response.filter(
        (post) => post.userId?._id === userDetails?._id
      );
      setUserPosts(filtered);
    } catch (err) {
      console.error("Failed to load feed", err);
      setFeedError("Failed to load your posts.");
    } finally {
      setIsLoadingFeed(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    const endpoint =
      editingPost.postType === "HelpOffer"
        ? `${offerHelpEndpoint}/${editingPost._id}`
        : `${requestHelpEndpoint}/${editingPost._id}`;

    try {
      await updateData(endpoint, {
        ...editingPost,
        description: editedDescription,
      });
      setEditingPost(null);
      setEditedDescription("");
      fetchUserFeeds();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userDetails?._id) {
      fetchUserFeeds();
    }
  }, [userDetails?._id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading profile...
      </div>
    );

  if (!loading && errorMessage)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {errorMessage}
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={
            userDetails?.avatar
              ? `${BASE_URL}${userDetails.avatar}`
              : "/default-avatar.png"
          }
          onError={(e) => (e.target.src = "/default-avatar.png")}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-2xl font-bold mt-4">{userDetails?.username}</h2>
        <p className="text-gray-600">{userDetails?.email}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Your Posts</h3>
        <button
          onClick={fetchUserFeeds}
          className="text-blue-500 text-sm mt-1 hover:underline"
        >
          Refresh Posts
        </button>

        {isLoadingFeed && (
          <div className="text-center mt-4">Loading posts...</div>
        )}

        {feedError && (
          <div className="text-red-600 mt-4 text-center">{feedError}</div>
        )}

        {!isLoadingFeed && !feedError && (
          <UserFeedPosts
            posts={userPosts}
            refreshPosts={fetchUserFeeds}
            onEdit={(post) => {
              setEditingPost(post);
              setEditedDescription(post.description);
            }}
          />
        )}
      </div>

      {editingPost && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-md font-semibold mb-2">Edit Post</h3>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border p-2 rounded text-sm"
            rows={3}
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={() => setEditingPost(null)}
              className="px-3 py-1 text-sm bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdatePost}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
