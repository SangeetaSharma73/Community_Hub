import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { FiPlusCircle } from "react-icons/fi";
import PostCreator from "../../components/PostCreator";
import UserFeed from "../UserFeed/UserFeed";
import { useNavigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  const navigator = useNavigate();
  const [refetch, setRefetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false);
    setRefetch(!refetch);
  };
  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-end">
          <button
            className="btn btn-primary gap-2"
            onClick={() => {
              if (token) {
                setShowModal(true);
              } else {
                navigator("/login");
              }
            }}
          >
            <FiPlusCircle className="text-lg" />
            Create Post
          </button>
        </div>

        <UserFeed refetchTrigger={refetch} />
      </main>
      {showModal && <PostCreator onClose={onCloseModal} />}
      <Footer />
    </div>
  );
}

export default Home;
