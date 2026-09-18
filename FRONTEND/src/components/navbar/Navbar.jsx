import "./navbar.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(
        "LOGOUT ERROR:",
        error.response?.data || error.message
      );
    }

    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        {/* CENTER - LOGO */}
        <Link to="/" className="logo">
          ✧ Stayvora.com ✧
        </Link>

        {/* RIGHT - USER */}
        {user ? (
          <div className="navItems">
            <button
              className="bookingButton"
              onClick={() => navigate("/mybookings")}
            >
              My Bookings
            </button>

            <span className="navUsername">
              👤 {user.username}
            </span>

            <button
              className="navButton"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButtonOutline">
                Register
              </button>
            </Link>

            <Link to="/login">
              <button className="navButton">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;