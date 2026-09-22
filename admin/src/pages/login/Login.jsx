import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const Login = () => {
  const [credentials, setCredential] = useState({
    hotel: "",
    password: "",
  });

  const { error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        `${API_URL}/hotels/admin/login`,
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log(
        "HOTEL ADMIN LOGIN RESPONSE:",
        res.data
      );

      if (res.data.isAdmin) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            ...res.data.details,
            isAdmin: true,
            hotelId: res.data.details.hotelId,
            hotelName: res.data.details.hotelName,
          },
        });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {
            message: "You are not allowed",
          },
        });
      }
    } catch (error) {
      console.log(
        "HOTEL ADMIN LOGIN ERROR:",
        error.response?.data || error.message
      );

      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data || {
            message: "Something went wrong",
          },
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">

        <div className="loginHeader">
          <h1>Stayvora Admin</h1>

          <p>
            Login with your hotel credentials
          </p>
        </div>

        <form onSubmit={handleClick}>

          <input
            type="text"
            placeholder="Hotel ID or Hotel Name"
            id="hotel"
            value={credentials.hotel}
            onChange={handleChange}
            className="lInput"
          />

          <input
            type="password"
            placeholder="Hotel Password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="lInput"
          />

          <button
            type="submit"
            className="lButton"
          >
            LOGIN
          </button>

        </form>

        {error && (
          <span>
            {error.message || "Login failed"}
          </span>
        )}

        <div className="createAdmin">
          <p>
            Don't have a hotel admin account?
          </p>

          <button
            type="button"
            className="createAdminButton"
            onClick={() =>
              navigate("/hotels/new")
            }
          >
            CREATE NEW HOTEL ADMIN
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;