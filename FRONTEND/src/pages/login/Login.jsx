import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext.jsx";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

      {/* =================================
              LEFT STAYVORA SECTION
      ================================= */}

      {/* <div className="loginBrand">

        <div className="brandOverlay">

          <div className="brandLogo">
            ✧ Stayvora.com ✧
          </div>

          <div className="brandLine"></div>

          <h1>
            A life full of exceptional
            <br />
            <span>stays, begins here.</span>
          </h1>

          <p className="brandTagline">
            EXPLORE&nbsp;&nbsp; • &nbsp;&nbsp;BOOK&nbsp;&nbsp; • &nbsp;&nbsp;EXPERIENCE
          </p>

          <div className="brandFeatures">

            <div className="brandFeature">
              <div className="featureIcon">🛏</div>
              <span>Premium<br />Stays</span>
            </div>

            <div className="brandFeature">
              <div className="featureIcon">♢</div>
              <span>Trusted<br />Bookings</span>
            </div>

            <div className="brandFeature">
              <div className="featureIcon">♡</div>
              <span>Memorable<br />Experiences</span>
            </div>

          </div>

        </div>

      </div>
 */}

      {/* =================================
              RIGHT LOGIN SECTION
      ================================= */}

      <div className="loginSection">

        <div className="lContainer">

          <div className="loginTitle">

            <h1>
              <span>Welcome</span> Back
            </h1>

            <p>
              Sign in to continue your journey
            </p>

          </div>


          <form onSubmit={handleClick}>

            {/* Username */}

            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className="lInput"
              autoComplete="username"
            />


            {/* Password */}

            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="lInput"
              autoComplete="current-password"
            />


            {/* Login Options */}

            <div className="loginOptions">

              <label>
                <input type="checkbox" />

                <span>
                  Remember me
                </span>
              </label>

              <span className="forgotPassword">
                Forgot password?
              </span>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="lButton"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOGIN  →"}
            </button>


            {/* Error */}

            {error && (
              <span className="loginError">
                {error.message}
              </span>
            )}

          </form>


          {/* =================================
                  SOCIAL LOGIN
          ================================= */}

          <div className="divider">

            <span></span>

            <p>
              or continue with
            </p>

            <span></span>

          </div>


          {/* Google */}

          <button
            type="button"
            className="socialButton"
          >

            <span className="googleIcon">
              G
            </span>

            Continue with Google

          </button>


          {/* Apple */}

          <button
            type="button"
            className="socialButton"
          >

            <span className="appleIcon">
              
            </span>

            Continue with Apple

          </button>


          {/* Register */}

          <div className="registerText">

            <span>
              New here?
            </span>

            <Link to="/register">
              Create an account
            </Link>

          </div>

        </div>

      </div>


      {/* =================================
                BOTTOM QUOTE
      ================================= */}

      <div className="loginQuote">
        “Good Stays
        <br />
        Create Great Stories.”
      </div>

    </div>
  );
};

export default Login;