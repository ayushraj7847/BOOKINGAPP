import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/maillist/MailList";
import Footer from "../../components/footer/Footer";

import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faHeart,
  faStar,
  faWifi,
  faUtensils,
  faCar,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../components/context/searchContext";
import { AuthContext } from "../../components/context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal]= useState(false);

  const { data, loading, error } = useFetch(`/api/hotels/find/${id}`);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate()
  
  const {date,options} = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;


const dayDifference = (date1, date2) => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
};


const days =
  date && date.length > 0
    ? dayDifference(date[0].startDate, date[0].endDate)
    : 1;
console.log(days)
  const photos = data.photos || [];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlide;

    if (direction === "l") {
      newSlide =
        slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlide =
        slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlide);
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong!</h2>;

  const handleClick = () =>{
   if(user){
   setOpenModal(true);
   }else{
    navigate("/login");
   }
  }


  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />

            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />

            <div className="sliderWrapper">
              <img
                src={photos[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}

        <div className="hotelWrapper">
          {/* TOP */}

          <div className="hotelTop">
            <div>
              <div className="hotelBadge">👑 Premium Hotel</div>

              <h1 className="hotelTitle">{data.name}</h1>

              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>

              <div className="hotelRating">
                <span>
                  <FontAwesomeIcon icon={faStar} /> {data.rating} Excellent
                </span>

                <span>
                  <FontAwesomeIcon icon={faWifi} /> Free Wi-Fi
                </span>
              </div>
            </div>

            <button className="saveBtn">
              <FontAwesomeIcon icon={faHeart} /> Save Hotel
            </button>
          </div>

          {/* IMAGES */}

          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div
                className="hotelImgWrapper"
                key={i}
                onClick={() => handleOpen(i)}
              >
                <img
                  src={photo}
                  alt="Hotel"
                  className="hotelImg"
                />

                {i === 0 && (
                  <div className="galleryBtn">
                    View all photos
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DETAILS */}

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h2 className="hotelHeading">
                Stay in the Heart of {data.city}
              </h2>

              <p className="hotelDesc">{data.desc}</p>

              <div className="hotelAmenities">
                <div className="amenity">
                  <FontAwesomeIcon icon={faWifi} />
                  <span>Free Wi-Fi</span>
                </div>

                <div className="amenity">
                  <FontAwesomeIcon icon={faUtensils} />
                  <span>Restaurant</span>
                </div>

                <div className="amenity">
                  <FontAwesomeIcon icon={faCar} />
                  <span>Airport Transfer</span>
                </div>

                <div className="amenity">
                  <FontAwesomeIcon icon={faDumbbell} />
                  <span>Fitness Center</span>
                </div>

                <div className="amenity">
                  <span>🏊 Swimming Pool</span>
                </div>

                <div className="amenity">
                  <span>💆 Spa & Wellness</span>
                </div>
              </div>
            </div>

            {/* BOOKING */}

            <div className="hotelDetailsPrice">
              <div className="bookingBadge">
                PERFECT FOR {days}-NIGHT STAY
              </div>

              <span className="bookingText">
                Comfortable rooms • Premium facilities • Excellent service
              </span>

              <span className="bookingText">
                Great location • Clean & Spacious
              </span>

              <span className="bookingText">
                Friendly Staff • Free Breakfast
              </span>

              <div className="priceBox">
                <small>Starting from</small>

                <h2>
                  ₹{days*data.cheapestPrice*options.room}
                  <span>({days}/nights)</span>
                </h2>
              </div>

              <button onClick={handleClick} className="reserveBtn">
                Reserve or Book Now!
              </button>

              <div className="priceGuarantee">
                🛡 Best Price Guarantee
              </div>
            </div>
          </div>
        </div>

        <MailList />
        <Footer />
      </div>
      {openModal && <Reserve setOpen = {setOpenModal} hotelId={id}/>}
    </>
  );
};

export default Hotel;