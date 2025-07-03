import { useState } from "react";
import axios from "axios";
import { forgetPassword } from "../../utils/endpoint"; // Make sure this imports from the correct location

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset the message before making the request
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post(forgetPassword, { email });

      if (response.data && response.data.message) {
        setMessage(response.data.message); // Assuming the message is returned in response
      } else {
        setMessage("Reset link sent! Check your email.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Something went wrong");
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>

        <form onSubmit={onFormSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full">Send Reset Link</button>
        </form>

        {message && (
          <p className="text-center mt-4 text-green-600">{message}</p>
        )}
        {errorMessage && (
          <p className="text-center mt-4 text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
