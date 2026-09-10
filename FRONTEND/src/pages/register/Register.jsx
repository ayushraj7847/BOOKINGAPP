import "./register.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:8800/api/auth/register",
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

          <input
            type="text"
            placeholder="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="rInput"
            autoComplete="username"
          />

          <input
            type="email"
            placeholder="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="rInput"
            autoComplete="email"
          />

          <input
            type="text"
            placeholder="country"
            id="country"
            value={credentials.country}
            onChange={handleChange}
            className="rInput"
            autoComplete="country-name"
          />

          <input
            type="text"
            placeholder="city"
            id="city"
            value={credentials.city}
            onChange={handleChange}
            className="rInput"
            autoComplete="address-level2"
          />

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
            style={{
              width: "100%",
              padding: "10px 20px",
              marginTop: "12px",
              border: "1px solid #d4af37",
              borderRadius: "25px",
              background: "#d4af37",
              color: "#111",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;