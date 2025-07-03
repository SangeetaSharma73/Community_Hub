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
import Navbar from "../../components/NavBar";

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
    fetchUserFeeds();
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
    <>
      <div>
        <Navbar />
      </div>
      <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src={
              userDetails?.avatar
                ? `${BASE_URL}${userDetails?.avatar}`
                : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4 text-indigo-700">
            {userDetails?.username}
          </h2>
          <p className="text-gray-600">{userDetails?.email}</p>
        </div>

        {/* Posts Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Your Posts</h3>
            <button
              onClick={fetchUserFeeds}
              className="text-sm text-blue-600 hover:underline"
            >
              🔄 Refresh
            </button>
          </div>

          {isLoadingFeed && (
            <div className="text-center mt-4 text-sm text-gray-500">
              Loading posts...
            </div>
          )}

          {feedError && (
            <div className="text-red-600 mt-4 text-center text-sm">
              {feedError}
            </div>
          )}

          {!isLoadingFeed && !feedError && (
            <div className="mt-4">
              <UserFeedPosts
                posts={userPosts}
                refreshPosts={fetchUserFeeds}
                onEditProp={(post) => {
                  setEditingPost(post);
                  setEditedDescription(post.description);
                }}
              />
            </div>
          )}
        </div>

        {/* Edit Post Section */}
        {editingPost && (
          <div className="mt-8 border-t border-gray-300 pt-6">
            <h3 className="text-md font-semibold mb-2 text-gray-800">
              ✏️ Edit Post
            </h3>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full border border-indigo-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={3}
            />
            <div className="flex justify-end mt-3 gap-2">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePost}
                className="px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
