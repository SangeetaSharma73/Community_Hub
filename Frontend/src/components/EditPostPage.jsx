import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, updateData } from "../services/httpMethods";
import { offerHelpEndpoint, requestHelpEndpoint } from "../utils/endpoint";
import Navbar from "./NavBar";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPost = async () => {
    setLoading(true);
    try {
      const helpOffer = await getData(`${offerHelpEndpoint}/${id}`);
      setPost({ ...helpOffer, postType: "HelpOffer" });
      setDescription(helpOffer.description);
    } catch {
      try {
        const helpRequest = await getData(`${requestHelpEndpoint}/${id}`);
        setPost({ ...helpRequest, postType: "HelpRequest" });
        setDescription(helpRequest.description);
      } catch (err) {
        setError("Post not found");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!post) return;
    const endpoint =
      post.postType === "HelpOffer"
        ? `${offerHelpEndpoint}/${id}`
        : `${requestHelpEndpoint}/${id}`;
    try {
      await updateData(endpoint, { ...post, description });
      navigate("/profile"); // back to profile after update
    } catch (err) {
      setError("Failed to update post");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Edit {post.postType}</h2>
        <label className="text-sm text-gray-700">Type</label>
        <div className="mb-3">{post.type}</div>

        <label className="text-sm text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          rows={4}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPostPage;
