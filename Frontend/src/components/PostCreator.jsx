// import React, { useState } from "react";
// import { FiX } from "react-icons/fi";
// import { offerHelpEndpoint, requestHelpEndpoint } from "../utils/endpoint";
// import { postData } from "../services/httpMethods";

// const PostCreator = ({ onClose }) => {
//   const [postType, setPostType] = useState("offer");
//   const [type, setType] = useState("medical");
//   const [description, setDescription] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [range, setRange] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async () => {
//     setErrorMessage("");

//     // Parse & validate coordinates
//     const lat = parseFloat(latitude);
//     const lng = parseFloat(longitude);
//     const rangeVal = parseFloat(range);

//     if (isNaN(lat) || isNaN(lng)) {
//       setErrorMessage("Latitude and Longitude must be valid numbers.");
//       return;
//     }

//     if (postType === "offer" && isNaN(rangeVal)) {
//       setErrorMessage("Range must be a valid number for help offers.");
//       return;
//     }

//     try {
//       const payload = {
//         type,
//         description,
//         location: {
//           type: "Point",
//           coordinates: [lng, lat], // GeoJSON format: [longitude, latitude]
//         },
//       };

//       if (postType === "offer") {
//         payload.availability = availability;
//         payload.range = rangeVal;
//       }

//       if (postType === "request") {
//         payload.status = "open"; // ✅ FIXED assignment
//       }

//       const url =
//         postType === "offer" ? offerHelpEndpoint : requestHelpEndpoint;

//       console.log("Sending payload:", payload); // ✅ for debugging

//       await postData(url, payload);
//       onClose();
//     } catch (err) {
//       console.error("Error posting:", err.response?.data || err.message);
//       setErrorMessage(
//         err.response?.data?.msg || "Something went wrong. Please try again."
//       );
//     }
//   };

//   return (
//     <dialog className="modal modal-open">
//       <div className="modal-box w-full max-w-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-bold text-lg">
//             New {postType === "offer" ? "Help Offer" : "Help Request"}
//           </h3>
//           <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
//             <FiX size={20} />
//           </button>
//         </div>

//         <div className="tabs tabs-boxed mb-4">
//           <button
//             className={`tab ${postType === "offer" ? "tab-active" : ""}`}
//             onClick={() => setPostType("offer")}
//           >
//             Help Offer
//           </button>
//           <button
//             className={`tab ${postType === "request" ? "tab-active" : ""}`}
//             onClick={() => setPostType("request")}
//           >
//             Help Request
//           </button>
//         </div>

//         <div className="form-control mb-3">
//           <label className="label">
//             <span className="label-text">Type</span>
//           </label>
//           <select
//             className="select select-bordered"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           >
//             <option value="medical">Medical</option>
//             <option value="food">Food</option>
//             <option value="transport">Transport</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {postType === "offer" && (
//           <>
//             <div className="form-control mb-3">
//               <label className="label">
//                 <span className="label-text">Availability</span>
//               </label>
//               <input
//                 type="text"
//                 className="input input-bordered"
//                 placeholder="e.g. Weekends, 9 AM - 5 PM"
//                 value={availability}
//                 onChange={(e) => setAvailability(e.target.value)}
//               />
//             </div>

//             <div className="form-control mb-3">
//               <label className="label">
//                 <span className="label-text">Range (in km)</span>
//               </label>
//               <input
//                 type="number"
//                 className="input input-bordered"
//                 placeholder="e.g. 10"
//                 value={range}
//                 onChange={(e) => setRange(e.target.value)}
//               />
//             </div>
//           </>
//         )}

//         <div className="form-control mb-3">
//           <label className="label">
//             <span className="label-text">Description</span>
//           </label>
//           <textarea
//             className="textarea textarea-bordered"
//             placeholder="Describe your need or help offer..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Latitude</span>
//             </label>
//             <input
//               type="number"
//               className="input input-bordered"
//               placeholder="e.g. 37.7749"
//               value={latitude}
//               onChange={(e) => setLatitude(e.target.value)}
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Longitude</span>
//             </label>
//             <input
//               type="number"
//               className="input input-bordered"
//               placeholder="e.g. -122.4194"
//               value={longitude}
//               onChange={(e) => setLongitude(e.target.value)}
//             />
//           </div>
//         </div>

//         {errorMessage && (
//           <div className="text-red-600 text-sm mb-2 text-center">
//             {errorMessage}
//           </div>
//         )}

//         <div className="modal-action">
//           <button className="btn" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             Post
//           </button>
//         </div>
//       </div>
//     </dialog>
//   );
// };

// export default PostCreator;

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { offerHelpEndpoint, requestHelpEndpoint } from "../utils/endpoint";
import { postData } from "../services/httpMethods";

const PostCreator = ({ onClose }) => {
  const [postType, setPostType] = useState("offer");
  const [type, setType] = useState("medical");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [range, setRange] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error getting geolocation", error);
          setErrorMessage("Unable to fetch current location.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSubmit = async () => {
    setErrorMessage("");

    // Validate latitude and longitude
    if (latitude === null || longitude === null) {
      setErrorMessage("Please allow access to your location.");
      return;
    }

    // Validate range for Help Offers
    const rangeVal = parseFloat(range);
    if (postType === "offer" && isNaN(rangeVal)) {
      setErrorMessage("Range must be a valid number for help offers.");
      return;
    }

    try {
      const payload = {
        type,
        description,
        location: {
          type: "Point",
          coordinates: [longitude, latitude], // GeoJSON format: [longitude, latitude]
        },
      };

      if (postType === "offer") {
        payload.availability = availability;
        payload.range = rangeVal;
      }

      if (postType === "request") {
        payload.status = "open"; // ✅ FIXED assignment
      }

      const url =
        postType === "offer" ? offerHelpEndpoint : requestHelpEndpoint;

      console.log("Sending payload:", payload); // ✅ for debugging

      await postData(url, payload);
      onClose();
    } catch (err) {
      console.error("Error posting:", err.response?.data || err.message);
      setErrorMessage(
        err.response?.data?.msg || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">
            New {postType === "offer" ? "Help Offer" : "Help Request"}
          </h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="tabs tabs-boxed mb-4">
          <button
            className={`tab ${postType === "offer" ? "tab-active" : ""}`}
            onClick={() => setPostType("offer")}
          >
            Help Offer
          </button>
          <button
            className={`tab ${postType === "request" ? "tab-active" : ""}`}
            onClick={() => setPostType("request")}
          >
            Help Request
          </button>
        </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select
            className="select select-bordered"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="medical">Medical</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
          </select>
        </div>

        {postType === "offer" && (
          <>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="e.g. Weekends, 9 AM - 5 PM"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Range (in km)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="e.g. 10"
                value={range}
                onChange={(e) => setRange(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Describe your need or help offer..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Location Display */}
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Current Location</span>
          </label>
          <div>
            {latitude && longitude ? (
              <p>
                Latitude: {latitude} <br />
                Longitude: {longitude}
              </p>
            ) : (
              <p>Fetching location...</p>
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-sm mb-2 text-center">
            {errorMessage}
          </div>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PostCreator;
