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
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user } = useContext(AuthContext);

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
            <span className="navUsername">
              👤 {user.username}
            </span>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButtonOutline">
              Register
            </button>

            <button className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;