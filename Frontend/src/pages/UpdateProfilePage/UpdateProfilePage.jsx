// // frontend/pages/UpdateProfilePage.jsx
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
//         setError(err?.response?.data?.msg || "Something went wrong");
//       });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
//       {error && <div className="text-red-500 text-center mb-4">{error}</div>}
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, updateData } from "../../services/httpMethods";
import { getProfileDetails, updateUserDetails } from "../../utils/endpoint";

const UpdateProfilePage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState(""); // New state for full name
  const [email, setEmail] = useState(""); // Email remains same and non-editable
  const [phone, setPhone] = useState(""); // New state for phone number
  const [address, setAddress] = useState(""); // New state for address
  const [password, setPassword] = useState(""); // New state for password
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [avatarFile, setAvatarFile] = useState(null); // Avatar file for profile picture
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getData(getProfileDetails);
        setUsername(response.username);
        setName(response.name || ""); // Assuming name is part of the profile
        setEmail(response.email);
        setPhone(response.phone || ""); // Assuming phone number is part of the profile
        setAddress(response.address || ""); // Assuming address is part of the profile
      } catch (err) {
        setError("Failed to load user profile data");
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("email", email); // Email remains same, just to pass it if necessary
    formData.append("phone", phone);
    formData.append("address", address);

    // Only append password if the user entered a new one
    if (password) {
      formData.append("password", password);
    }

    if (avatarFile) {
      formData.append("avatar", avatarFile); // Attach avatar if it's updated
    }

    try {
      await updateData(updateUserDetails, formData);
      alert("Profile Updated Successfully!");
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {/* Left Column */}
        <div className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Avatar (Profile Picture) */}
          <input
            type="file"
            className="input input-bordered w-full"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Email (non-editable) */}
          <div className="input input-bordered w-full bg-gray-100 cursor-not-allowed">
            <input
              type="email"
              placeholder="Email"
              value={email}
              readOnly
              className="w-full"
            />
          </div>

          {/* Address */}
          <textarea
            placeholder="Address"
            className="textarea textarea-bordered w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="col-span-2 flex justify-center mt-4">
          <button className="btn btn-primary w-full sm:w-1/3" type="submit">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
