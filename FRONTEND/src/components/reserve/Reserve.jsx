import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/searchContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const {
    data,
    loading,
    error,
  } = useFetch(`/hotels/room/${hotelId}`);

  const {
    data: hotelData,
    loading: hotelLoading,
    error: hotelError,
  } = useFetch(`/hotels/find/${hotelId}`);

  const {
    city,
    date,
    options,
    hasSearched,
  } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();

  const fromSearch =
    location.state?.fromSearch === true;

  // Get actual property type
  const propertyType =
    hotelData?.type
      ?.toString()
      .trim()
      .toLowerCase() || "";

  // Direct booking property types
  const directTypes = [
    "apartment",
    "apartments",
    "flat",
    "flats",
    "villa",
    "villas",
    "resort",
    "resorts",
    "cottage",
    "cottages",
  ];

  // Property has no rooms
  const hasNoRooms =
    hotelData &&
    Array.isArray(hotelData.rooms) &&
    hotelData.rooms.length === 0;

  // Direct booking
  const isDirectBooking =
    directTypes.includes(propertyType) ||
    (hasNoRooms &&
      propertyType !== "hotel");

  console.log(
    "HOTEL DATA:",
    hotelData
  );

  console.log(
    "HOTEL TYPE:",
    propertyType
  );

  console.log(
    "HAS NO ROOMS:",
    hasNoRooms
  );

  console.log(
    "DIRECT BOOKING:",
    isDirectBooking
  );

  const getDatesInRange = (
    startDate,
    endDate
  ) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const list = [];

    const current = new Date(
      start.getTime()
    );

    while (current <= end) {
      list.push(current.getTime());

      current.setDate(
        current.getDate() + 1
      );
    }

    return list;
  };

  const allDates =
    date &&
    date.length > 0 &&
    date[0]?.startDate &&
    date[0]?.endDate
      ? getDatesInRange(
          date[0].startDate,
          date[0].endDate
        )
      : [];

  const bookingDates =
    allDates.length > 0
      ? allDates
      : isDirectBooking
      ? [
          new Date(
            new Date().setHours(
              0,
              0,
              0,
              0
            )
          ).getTime(),
        ]
      : [];

  const isAvailable = (roomNumber) => {
    const isFound =
      roomNumber.unavailableDates.some(
        (roomDate) =>
          allDates.includes(
            new Date(roomDate).getTime()
          )
      );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter(
            (item) => item !== value
          )
    );
  };

  const handleClick = async () => {
    // Existing hotel flow
    if (!isDirectBooking && !fromSearch) {
      alert(
        "Please fill your booking details first. Redirecting to home page..."
      );

      setOpen(false);
      navigate("/");

      return;
    }

    // Existing hotel search validation
    if (
      !isDirectBooking &&
      (
        !hasSearched ||
        !city ||
        !city.trim() ||
        !date ||
        date.length === 0 ||
        !date[0]?.startDate ||
        !date[0]?.endDate ||
        !options ||
        !options.adult ||
        !options.room
      )
    ) {
      alert(
        "Please fill your booking details first. Redirecting to home page..."
      );

      setOpen(false);
      navigate("/");

      return;
    }

    // Validate dates
    if (allDates.length > 0) {
      const startDate = new Date(
        date[0].startDate
      );

      const endDate = new Date(
        date[0].endDate
      );

      if (
        isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime())
      ) {
        alert(
          "Please select valid booking dates first."
        );

        setOpen(false);
        navigate("/");

        return;
      }

      if (endDate < startDate) {
        alert(
          "Check-out date must be after check-in date."
        );

        setOpen(false);
        navigate("/");

        return;
      }
    }

    // Room check only for normal hotel
    if (
      !isDirectBooking &&
      selectedRooms.length === 0
    ) {
      alert(
        "Please select at least one room!"
      );

      return;
    }

    if (bookingDates.length === 0) {
      alert(
        "Please select your booking dates!"
      );

      return;
    }

    try {
      // Update room availability only for hotel
      if (!isDirectBooking) {
        await Promise.all(
          selectedRooms.map((roomId) => {
            return axios.put(
              `${API_URL}/rooms/availability/${roomId}`,
              {
                dates: bookingDates,
              },
              {
                withCredentials: true,
              }
            );
          })
        );
      }

      // Create booking
      const bookingResponse =
        await axios.post(
          `${API_URL}/bookings`,
          {
            hotelId: hotelId,
            selectedRooms: isDirectBooking
              ? []
              : selectedRooms,
            dates: bookingDates,
          },
          {
            withCredentials: true,
          }
        );

      console.log(
        "BOOKING CREATED:",
        bookingResponse.data
      );

      alert("Booking successful!");

      setOpen(false);
      navigate("/");
    } catch (error) {
      console.log(
        "BOOKING ERROR:",
        error.response?.data ||
          error.message
      );

      if (
        error.response?.status === 401
      ) {
        alert(
          "Please login before booking!"
        );
      } else {
        alert(
          error.response?.data?.message ||
            "Booking failed!"
        );
      }
    }
  };

  if (
    loading ||
    hotelLoading
  ) {
    return <h2>Loading...</h2>;
  }

  if (
    error ||
    hotelError
  ) {
    return (
      <h2>
        Something went wrong!
      </h2>
    );
  }

  return (
    <div className="reserve">
      <div className="rContainer">

        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        <span>
          {isDirectBooking
            ? "Book this property"
            : "Select your rooms"}
        </span>

        {/* Rooms only for normal hotel */}
        {!isDirectBooking &&
          data.map((item) => (
            <div
              className="rItem"
              key={item._id}
            >
              <div className="rItemInfo">

                <div className="rTitle">
                  {item.title}
                </div>

                <div className="rDesc">
                  {item.desc}
                </div>

                <div className="rMax">
                  Max People:{" "}
                  <b>
                    {item.maxPeople}
                  </b>
                </div>

                <div className="rPrice">
                  ₹{item.price}
                </div>

              </div>

              <div className="rSelectRooms">

                {item.roomNumbers.map(
                  (roomNumber) => (
                    <div
                      className="room"
                      key={roomNumber._id}
                    >
                      <label>
                        {roomNumber.number}
                      </label>

                      <input
                        type="checkbox"
                        value={
                          roomNumber._id
                        }
                        onChange={
                          handleSelect
                        }
                        disabled={
                          !isAvailable(
                            roomNumber
                          )
                        }
                      />
                    </div>
                  )
                )}

              </div>
            </div>
          ))}

        {/* Direct booking */}
        {isDirectBooking && (
          <div className="directBookingInfo">

            <h3>
              {hotelData?.name}
            </h3>

            <p>
              This property does not require
              room selection.
            </p>

            <p>
              Click Reserve Now to book directly.
            </p>

          </div>
        )}

        <button
          className="rButton"
          onClick={handleClick}
        >
          Reserve Now!
        </button>

      </div>
    </div>
  );
};

export default Reserve;