import "./register.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    password: "",
  });

  const { dispatch, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      !credentials.username ||
      !credentials.email ||
      !credentials.country ||
      !credentials.city ||
      !credentials.password
    ) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: {
          message: "Please fill all fields",
        },
      });

      return;
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        `${API_URL}/auth/register`,
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log("REGISTER RESPONSE:", res.data);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          ...res.data.details,
          isAdmin: res.data.isAdmin,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(
        "REGISTER ERROR:",
        error.response?.data || error.message
      );

      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data || {
            message: "Registration failed",
          },
      });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h1>Create Account</h1>

        <form onSubmit={handleClick}>
          {/* USERNAME */}
          <input
            type="text"
            placeholder="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="rInput"
            autoComplete="username"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="rInput"
            autoComplete="email"
          />

          {/* COUNTRY */}
          <input
            type="text"
            placeholder="country"
            id="country"
            value={credentials.country}
            onChange={handleChange}
            className="rInput"
            autoComplete="country-name"
          />

          {/* CITY */}
          <input
            type="text"
            placeholder="city"
            id="city"
            value={credentials.city}
            onChange={handleChange}
            className="rInput"
            autoComplete="address-level2"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="rInput"
            autoComplete="new-password"
          />

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="rButton"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "REGISTER"}
          </button>

          {error && (
            <span className="registerError">
              {error.message}
            </span>
          )}

          {/* BACK TO HOME BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="backHomeButton"
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;