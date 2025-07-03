import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { FiPlusCircle } from "react-icons/fi";
import PostCreator from "../../components/PostCreator";
import UserFeed from "../UserFeed/UserFeed";
import { useNavigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
    setRefetch(!refetch);
  };

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-200 min-h-screen text-gray-800">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Create Post Box */}
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740" // Replace with actual user image or default
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div
            className="flex-1 bg-gray-100 hover:bg-gray-200 cursor-pointer px-4 py-3 rounded-full text-gray-600"
            onClick={() => {
              if (token) {
                setShowModal(true);
              } else {
                navigate("/login");
              }
            }}
          >
            Start a post...
          </div>
        </div>

        {/* User Feed */}
        <section>
          <UserFeed refetchTrigger={refetch} />
        </section>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full animate-fadeIn">
            <PostCreator onClose={onCloseModal} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
