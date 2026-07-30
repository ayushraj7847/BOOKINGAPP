import "./SearchItem.css";
import {
  faLocationDot,
  faHeart,
  faWifi,
  faUtensils,
  faBed,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">

      {/* Hotel Image */}
      <div className="siImageContainer">
        <img
          src={item.photos[0]}
          alt="Hotel"
          className="siImg"
        />

        <button className="favoriteBtn">
          <FontAwesomeIcon icon={faHeart} />
        </button>

        <div className="siBadge">
          Apartment
        </div>

        <div className="siImageRating">
          <FontAwesomeIcon icon={faStar} />
          <span>4.8</span>
          <small>(128 reviews)</small>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="siDesc">

        <h1 className="siTitle">
          {item.name}
        </h1>

        <span className="siLocation">
          <FontAwesomeIcon icon={faLocationDot} />
          Delhi, India • 1.2 km from city centre
        </span>

        <div className="siHighlights">
          <span className="green">
            ✓ Free cancellation
          </span>

          <span>
            Pay at the property
          </span>
        </div>

        <p className="siSubtitle">
          Entire apartment • 1 bedroom • 1 living room
        </p>

        <div className="siFeatures">
         <span>{item.desc}</span>
         
        </div>

      </div>

      {/* Price Section */}
      <div className="siDetails">

        {item.rating && <div className="siRating">

          <span>Excellent</span>

          <button>
            {item.rating}
          </button>

        </div>}

        <div className="siDetailTexts">

          <span className="siPrice">
            ${item.cheapestPrice}
          </span>

          <span className="siTaxOp">
            Includes taxes & fees
          </span>
          <Link  to={`/hotels/${item._id}`}>
          <button className="siCheckButton">
            See availability
          </button>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default SearchItem;