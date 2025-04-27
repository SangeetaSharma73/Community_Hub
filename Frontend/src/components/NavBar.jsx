import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { BASE_URL, getUserDetailsEndpoint } from "../utils/endpoint";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await fetch(`${BASE_URL}${getUserDetailsEndpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserDetails(data);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const onUserLogout = () => {
    localStorage.removeItem("token");
    setUserDetails(null);
    navigate("/login");
  };

  const onUpdateUserProfile = () => {
    navigate("/update-profile");
  };

  return (
    <nav className="navbar bg-base-100 border-b border-base-200 px-4 md:px-10 relative">
      <div className="navbar-start flex items-center justify-between w-full lg:w-auto">
        <a className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 drop-shadow-sm">
          <span className="hidden md:inline-block">🟣 </span>Community Hub
        </a>

        <div className="lg:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className="navbar-end hidden lg:flex gap-5 items-center">
        <a className="link link-hover text-base">Explore</a>
        <a className="link link-hover text-base">Advertise</a>
        <a className="link link-hover text-base">Blog</a>

        {userDetails ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={
                    userDetails.avatar
                      ? `${BASE_URL}${userDetails.avatar}`
                      : "/default-avatar.png"
                  }
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold">{userDetails.username}</span>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => navigate("/profile")}>View Profile</a>
              </li>
              <li>
                <a onClick={onUpdateUserProfile}>Update Profile</a>
              </li>
              <li>
                <a onClick={onUserLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn btn-md btn-primary"
            onClick={() => navigate("/login")}
          >
            LogIn
          </button>
        )}
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 shadow-md flex flex-col items-start gap-4 px-6 py-4 lg:hidden z-50">
          <a className="link link-hover text-base">Explore</a>
          <a className="link link-hover text-base">Advertise</a>
          <a className="link link-hover text-base">Blog</a>

          {userDetails ? (
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={
                      userDetails.avatar
                        ? `http://localhost:8000${userDetails.avatar}`
                        : "/default-avatar.png"
                    }
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold">{userDetails.username}</span>
              </div>

              <a
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile");
                }}
                className="block py-1"
              >
                View Profile
              </a>
              <a
                onClick={() => {
                  setIsMenuOpen(false);
                  onUpdateUserProfile();
                }}
                className="block py-1"
              >
                Update Profile
              </a>
              <a
                onClick={() => {
                  setIsMenuOpen(false);
                  onUserLogout();
                }}
                className="block py-1 text-red-500"
              >
                Logout
              </a>
            </div>
          ) : (
            <button
              className="btn btn-md btn-primary mt-2"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
            >
              LogIn
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
