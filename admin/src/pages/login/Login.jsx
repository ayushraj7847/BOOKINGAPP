import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredential] = useState({
    username: "",
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
        "http://localhost:8800/api/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.isAdmin) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            ...res.data.details,
            isAdmin: res.data.isAdmin,
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

        <form onSubmit={handleClick}>

          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />

          <input
            type="password"
            placeholder="password"
            id="password"
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

        {error && <span>{error.message}</span>}

      </div>
    </div>
  );
};

export default Login;