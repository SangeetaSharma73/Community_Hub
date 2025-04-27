// pages/NotFound.jsx

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-base-100 px-6 py-12">
      <h1 className="text-7xl font-bold text-error mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 max-w-md mb-6">
        The page you’re looking for doesn’t exist or has been moved. Don’t
        worry, you can always head back to safety.
      </p>

      <Link to="/" className="btn btn-primary">
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
