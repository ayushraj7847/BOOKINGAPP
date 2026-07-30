import "./maillist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faTag,
  faClock,
  faShieldHalved,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const MailList = () => {
  return (
    <div className="mail">

      <div className="mailIcon">
        <FontAwesomeIcon icon={faEnvelope} />
      </div>

      <h1 className="mailTitle">
        Save <span>time</span>, save <span>money</span>
      </h1>

      <p className="mailDesc">
        Sign up and we'll send the best deals to you
      </p>

      <div className="mailInputContainer">

        <div className="inputBox">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="inputIcon"
          />

          <input
            type="email"
            placeholder="Your Email"
          />
        </div>

        <button>
          Subscribe
          <FontAwesomeIcon icon={faArrowRight} />
        </button>

      </div>

      <div className="mailFeatures">

        <div className="featureCard">
          <div className="featureIcon">
            <FontAwesomeIcon icon={faTag} />
          </div>

          <h3>Best Price Guarantee</h3>

          <p>
            Get the best deals or we match the price
          </p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">
            <FontAwesomeIcon icon={faClock} />
          </div>

          <h3>Save Time</h3>

          <p>
            Quick & easy booking in just a few clicks
          </p>
        </div>

        <div className="featureCard">
          <div className="featureIcon">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>

          <h3>Secure Booking</h3>

          <p>
            Your information is safe and always protected
          </p>
        </div>

      </div>

    </div>
  );
};

export default MailList;