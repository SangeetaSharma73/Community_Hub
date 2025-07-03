// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getData } from "../../services/httpMethods";
// import { BASE_URL, getUserFeedEndpoint } from "../../utils/endpoint";
// import PostCard from "../../components/PostCard";
// import PostSkeleton from "../../components/react-skeleton/PostCardSkeleton";

// function UserFeed({ refetchTrigger }) {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const getUserFeeds = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getData(getUserFeedEndpoint, false);
//       setPosts(response);
//     } catch (error) {
//       console.error("Error loading feed", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUserFeeds();
//   }, [refetchTrigger]);

//   const onUserLike = async (postId, postType) => {
//     try {
//       await axios.post(`${BASE_URL}/api/feed/${postId}/like`, {
//         postType,
//       });
//       getUserFeeds();
//     } catch (error) {
//       console.error("Error liking post", error);
//     }
//   };

//   const onUserDislike = async (postId, postType) => {
//     try {
//       await axios.post(`${BASE_URL}/api/feed/${postId}/unlike`, {
//         postType,
//       });
//       getUserFeeds();
//     } catch (error) {
//       console.error("Error unliking post", error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
//       {isLoading
//         ? Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)
//         : posts.map((post) => (
//             <PostCard
//               key={post._id}
//               postData={post}
//               onUserLike={onUserLike}
//               onUserDislike={onUserDislike}
//             />
//           ))}
//     </div>
//   );
// }

// export default UserFeed;

import axios from "axios";
import { useEffect, useState } from "react";
import { getData } from "../../services/httpMethods";
import { BASE_URL, getUserFeedEndpoint } from "../../utils/endpoint";
import PostCard from "../../components/PostCard";
import PostSkeleton from "../../components/react-skeleton/PostCardSkeleton";

function UserFeed({ refetchTrigger }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch user feeds
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

  // // Function to handle liking a post
  // const onUserLike = async (postId, postType) => {
  //   try {
  //     await axios.post(`${BASE_URL}/api/feed/${postId}/like`, {
  //       postType,
  //     });
  //     getUserFeeds();
  //   } catch (error) {
  //     console.error("Error liking post", error);
  //   }
  // };

  // // Function to handle unliking a post
  // const onUserDislike = async (postId, postType) => {
  //   try {
  //     await axios.post(`${BASE_URL}/api/feed/${postId}/unlike`, {
  //       postType,
  //     });
  //     getUserFeeds();
  //   } catch (error) {
  //     console.error("Error unliking post", error);
  //   }
  // };

  // Function to handle liking a post
  const onUserLike = async (postId, postType) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/feed/${postId}/like`,
        { postType },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      getUserFeeds(); // Refetch the user feed after liking the post
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  // Function to handle unliking a post
  const onUserDislike = async (postId, postType) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/feed/${postId}/unlike`,
        { postType },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      getUserFeeds(); // Refetch the user feed after unliking the post
    } catch (error) {
      console.error("Error unliking post", error);
    }
  };

  // Function to handle post edit
  const openEditModal = (post) => {
    console.log("Edit post", post);
    // Add your logic to open a modal or navigate to an edit page
  };

  // Function to handle post deletion
  const confirmAndDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // Perform the delete operation here
      console.log("Delete post with ID:", postId);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post) => (
            <PostCard
              key={post._id}
              postData={post}
              onUserLike={onUserLike} // Corrected to use onUserLike
              onUserUnlike={onUserDislike} // Corrected to use onUserDislike
              onEditPost={openEditModal} // Pass the edit function
              onDeletePost={confirmAndDeletePost} // Pass the delete function
            />
          ))}
    </div>
  );
}

export default UserFeed;
