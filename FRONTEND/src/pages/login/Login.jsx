import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredential] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
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
        "http://localhost:8800/api/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.details,
      });

      navigate("/");
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data || {
          message: "Something went wrong",
        },
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <form onSubmit={handleClick}>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="lButton"
            disabled={loading}
          >
            LOGIN
          </button>

          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;