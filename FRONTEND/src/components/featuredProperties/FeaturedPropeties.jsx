import "./featuredProperties.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";

const hotels = [
  {
    name: "Apex Hotel",
    city: "Delhi",
    price: "₹3,200",
    rating: "9.3",
    image:
      "",
  },
  
];

const FeaturedPropeties = () => {
  const {data,loading,error}= useFetch("http://localhost:8800/api/hotels?featured=true&limit=4")
  
  return (
    <div className="fp">
      {loading?"loading":<>
      {data.map((item) => (
        <div className="fpItem" key={item._id}>
          <img
            src={item.photos[0]}
            alt={item.name}
            className="fpImg"
          />

          <div className="fpContent">
            {item.rating &&<div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}

            <h2 className="fpName">{item.name}</h2>

            <span className="fpCity">
              <FontAwesomeIcon icon={faLocationDot} />
              {item.city}
            </span>

            <div className="fpBottom">
              <div>
                <h3>{item.cheapestPrice}</h3>
                <small>/ night</small>
              </div>

              <div className="fpDiscount">
                <FontAwesomeIcon icon={faStar} />
                10% Genius Discount
              </div>
            </div>
          </div>
        </div>
      ))}
    </>}
    </div> 
  );
};

export default FeaturedPropeties;