// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getData, updateData } from "../../services/httpMethods";
// import { getProfileDetails, updateUserDetails } from "../../utils/endpoint";

// const UpdateProfilePage = () => {
//   const [username, setUsername] = useState("");
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       await getData(getProfileDetails).then((response) => {
//         setUsername(response.username);
//       });
//     };
//     fetchUserProfile();
//   }, []);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("username", username);
//     if (avatarFile) {
//       formData.append("avatar", avatarFile);
//     }

//     await updateData(updateUserDetails, formData)
//       .then(() => {
//         alert("Profile Updated Successfully!");
//         navigate("/profile");
//       })
//       .catch((err) => {
//         setError(err);
//       });
//   };
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">{error}</div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
//       <form
//         onSubmit={handleUpdate}
//         className="flex flex-col gap-4"
//         encType="multipart/form-data"
//       >
//         <input
//           type="text"
//           placeholder="Username"
//           className="input input-bordered w-full"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="file"
//           className="input input-bordered w-full"
//           accept="image/*"
//           onChange={(e) => setAvatarFile(e.target.files[0])}
//         />
//         <button className="btn btn-primary" type="submit">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfilePage;

// frontend/pages/UpdateProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, updateData } from "../../services/httpMethods";
import { getProfileDetails, updateUserDetails } from "../../utils/endpoint";

const UpdateProfilePage = () => {
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      await getData(getProfileDetails).then((response) => {
        setUsername(response.username);
      });
    };
    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    await updateData(updateUserDetails, formData)
      .then(() => {
        alert("Profile Updated Successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        setError(err?.response?.data?.msg || "Something went wrong");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="file"
          className="input input-bordered w-full"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
        <button className="btn btn-primary" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
