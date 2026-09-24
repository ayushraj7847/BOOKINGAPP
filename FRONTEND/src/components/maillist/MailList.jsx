import "./maillist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faBuilding,
  faChartLine,
  faPlusCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MailList = () => {
  const navigate = useNavigate();

  return (
    <div className="mail">

      <div className="mailIcon">
        <FontAwesomeIcon icon={faHandshake} />
      </div>

      <h1 className="mailTitle">
        Partner <span>with</span> Stayvora
      </h1>

      <p className="mailDesc">
        List your hotel, villa, apartment or other property
        and grow your business with Stayvora
      </p>

      <div className="mailInputContainer">

        <button
          className="partnerButton"
          onClick={() => navigate("/partner")}
        >
          Become a Partner

          <FontAwesomeIcon
            icon={faArrowRight}
          />
        </button>

      </div>

      <div className="mailFeatures">

        <div className="featureCard">

          <div className="featureIcon">
            <FontAwesomeIcon
              icon={faBuilding}
            />
          </div>

          <h3>
            Add Your Property
          </h3>

          <p>
            Add hotels, villas, apartments
            and other properties easily.
          </p>

        </div>

        <div className="featureCard">

          <div className="featureIcon">
            <FontAwesomeIcon
              icon={faChartLine}
            />
          </div>

          <h3>
            Grow Your Business
          </h3>

          <p>
            Reach more customers and
            increase your bookings.
          </p>

        </div>

        <div className="featureCard">

          <div className="featureIcon">
            <FontAwesomeIcon
              icon={faPlusCircle}
            />
          </div>

          <h3>
            Manage Your Property
          </h3>

          <p>
            Add rooms, prices, photos
            and manage your listings.
          </p>

        </div>

      </div>

    </div>
  );
};

export default MailList;