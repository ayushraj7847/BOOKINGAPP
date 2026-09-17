import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";

import useFetch from "../../context/hooks/useFetch";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState("");
  const [rooms, setRooms] = useState("");

  // Get hotels from live backend
  const { data, loading } = useFetch("/hotels");

  useEffect(() => {
    if (data && data.length > 0) {
      setHotelId(data[0]._id);
      console.log("DEFAULT HOTEL ID:", data[0]._id);
    }
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    console.log("SEND BUTTON CLICKED");
    console.log("HOTEL ID BEFORE REQUEST:", hotelId);

    try {
      // Convert room numbers into array
      const roomNumbers = rooms
        .split(",")
        .map((room) => ({
          number: Number(room.trim()),
        }))
        .filter((room) => !isNaN(room.number));

      console.log("ROOM INFO:", info);
      console.log("ROOM NUMBERS:", roomNumbers);
      console.log("HOTEL ID:", hotelId);

      if (!hotelId) {
        console.log("HOTEL ID IS UNDEFINED");
        alert("Please select a hotel!");
        return;
      }

      if (roomNumbers.length === 0) {
        alert("Please enter at least one room number!");
        return;
      }

      // Create room using live Render backend
      const res = await axios.post(
        `${API_URL}/rooms/${hotelId}`,
        {
          ...info,
          roomNumbers,
        },
        {
          withCredentials: true,
        }
      );

      console.log("ROOM CREATE RESPONSE:", res.data);
      console.log("ROOM HAS BEEN CREATED");

      alert("Room has been created successfully!");
    } catch (error) {
      console.log(
        "ROOM CREATE ERROR:",
        error.response?.data || error.message
      );

      console.log(
        "ERROR STATUS:",
        error.response?.status
      );

      alert(
        error.response?.data?.message ||
          "Room creation failed!"
      );
    }
  };

  return (
    <div className="new">
      <Sidebar />

      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1>Add New Rooms</h1>
        </div>

        <div className="bottom">
          <div className="right">
            <form onSubmit={handleClick}>

              {/* Room information */}
              {roomInputs.map((input) => (
                <div
                  className="formInput"
                  key={input.id}
                >
                  <label>{input.label}</label>

                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Room numbers */}
              <div className="formInput">
                <label>Rooms</label>

                <textarea
                  value={rooms}
                  onChange={(e) =>
                    setRooms(e.target.value)
                  }
                  placeholder="Give comma between room numbers."
                />
              </div>

              {/* Choose hotel */}
              <div className="formInput">
                <label>Choose a hotel</label>

                <select
                  id="hotelId"
                  value={hotelId}
                  onChange={(e) => {
                    setHotelId(e.target.value);

                    console.log(
                      "SELECTED HOTEL ID:",
                      e.target.value
                    );
                  }}
                >
                  {loading ? (
                    <option value="">
                      Loading...
                    </option>
                  ) : data && data.length > 0 ? (
                    data.map((hotel) => (
                      <option
                        key={hotel._id}
                        value={hotel._id}
                      >
                        {hotel.name}
                      </option>
                    ))
                  ) : (
                    <option value="">
                      No hotels found
                    </option>
                  )}
                </select>
              </div>

              <button type="submit">
                Send
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;