import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordEndpoint } from "../../utils/endpoint";
import { postData } from "../../services/httpMethods";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onResetPasswordFormSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    await postData(resetPasswordEndpoint, newPassword)
      .then(() => {
        setMessage("Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={onResetPasswordFormSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full">Reset Password</button>
        </form>

        {message && (
          <p className="text-green-600 mt-4 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
