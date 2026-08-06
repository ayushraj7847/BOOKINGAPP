import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../context/searchContext";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(
    `/api/hotels/room/${hotelId}`
  );

  const { date } = useContext(SearchContext);

  
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const list = [];
    const current = new Date(start.getTime());

    while (current <= end) {
      list.push(current.getTime());
      current.setDate(current.getDate() + 1);
    }

    return list;
  };

  const allDates =
    date && date.length > 0
      ? getDatesInRange(
          date[0].startDate,
          date[0].endDate
        )
      : [];

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((roomDate) =>
      allDates.includes(new Date(roomDate).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = () => {
    console.log(selectedRooms);
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Something went wrong!</h2>;

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        <span>Select your rooms</span>

        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>

              <div className="rDesc">{item.desc}</div>

              <div className="rMax">
                Max People: <b>{item.maxPeople}</b>
              </div>

              <div className="rPrice">
                ₹{item.price}
              </div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div
                  className="room"
                  key={roomNumber._id}
                >
                  <label>{roomNumber.number}</label>

                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

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