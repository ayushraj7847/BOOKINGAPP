import "./navbar.css";
import { useContext } from "react";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8800/api/auth/logout",
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
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <span className="logo">
            ✧ Stayvora.com ✧
          </span>
        </Link>

        <div className="navMenu">
          <div className="navMenuItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className="navMenuItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="navMenuItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>

          <div className="navMenuItem">
            <FontAwesomeIcon icon={faUmbrellaBeach} />
            <span>Attractions</span>
          </div>

          <div className="navMenuItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>

        {user ? (
  <div className="navItems">

    <Link to="/mybookings">
      <button className="navButtonOutline">
        My Bookings
      </button>
    </Link>

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