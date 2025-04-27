import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../services/httpMethods";
import { USER_SIGNUP } from "../../utils/endpoint";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitSignUpForm = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await postData(USER_SIGNUP, formData, false);
      setMessage("Registered successfully! You can now log in.");
      navigate("/login");
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={onSubmitSignUpForm} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-full">Sign Up</button>
        </form>

        {message && <p className="text-center mt-4 text-red-500">{message}</p>}

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
