import axios from "axios";
import { useEffect, useState } from "react";
import { getData } from "../../services/httpMethods";
import { BASE_URL, getUserFeedEndpoint } from "../../utils/endpoint";
import PostCard from "../../components/PostCard";
import PostSkeleton from "../../components/react-skeleton/PostCardSkeleton";

function UserFeed({ refetchTrigger }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserFeeds = async () => {
    setIsLoading(true);
    try {
      const response = await getData(getUserFeedEndpoint, false);
      setPosts(response);
    } catch (error) {
      console.error("Error loading feed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserFeeds();
  }, [refetchTrigger]);

  const onUserLike = async (postId, postType) => {
    try {
      await axios.post(`${BASE_URL}/api/feed/${postId}/like`, {
        postType,
      });
      getUserFeeds();
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const onUserDislike = async (postId, postType) => {
    try {
      await axios.post(`${BASE_URL}/api/feed/${postId}/unlike`, {
        postType,
      });
      getUserFeeds();
    } catch (error) {
      console.error("Error unliking post", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Community Feed
      </h2>

      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post) => (
            <PostCard
              key={post._id}
              postData={post}
              onUserLike={onUserLike}
              onUserDislike={onUserDislike}
            />
          ))}
    </div>
  );
}

export default UserFeed;
