import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";

import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [rooms, setRooms] = useState("");

  // Get logged-in property
  useEffect(() => {
    const getLoggedInProperty = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user")
        );

        if (!user?.hotelId) {
          alert(
            "Hotel information not found. Please login again!"
          );
          return;
        }

        setHotelId(user.hotelId);

        // Get current property details
        const res = await axios.get(
          `${API_URL}/hotels/admin/profile`,
          {
            withCredentials: true,
          }
        );

        setHotelName(res.data?.name || "");
      } catch (error) {
        console.log(
          "PROPERTY FETCH ERROR:",
          error.response?.data || error.message
        );

        alert(
          error.response?.data?.message ||
            "Unable to load property!"
        );
      }
    };

    getLoggedInProperty();
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    console.log("SEND BUTTON CLICKED");
    console.log(
      "LOGGED-IN HOTEL ID:",
      hotelId
    );

    try {
      // Convert room numbers into array
      const roomNumbers = rooms
        .split(",")
        .map((room) => ({
          number: Number(room.trim()),
        }))
        .filter(
          (room) => !isNaN(room.number)
        );

      console.log("ROOM INFO:", info);
      console.log(
        "ROOM NUMBERS:",
        roomNumbers
      );
      console.log(
        "HOTEL ID:",
        hotelId
      );

      if (!hotelId) {
        alert(
          "Hotel information not found. Please login again!"
        );
        return;
      }

      if (roomNumbers.length === 0) {
        alert(
          "Please enter at least one room number!"
        );
        return;
      }

      // Create room for logged-in property
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

      console.log(
        "ROOM CREATE RESPONSE:",
        res.data
      );

      console.log(
        "ROOM HAS BEEN CREATED"
      );

      alert(
        "Room has been created successfully!"
      );
    } catch (error) {
      console.log(
        "ROOM CREATE ERROR:",
        error.response?.data ||
          error.message
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
                  <label>
                    {input.label}
                  </label>

                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={
                      input.placeholder
                    }
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
                    setRooms(
                      e.target.value
                    )
                  }
                  placeholder="Give comma between room numbers."
                />
              </div>

              {/* Logged-in property */}
              <div className="formInput">
                <label>
                  Your Property
                </label>

                <input
                  type="text"
                  value={
                    hotelName ||
                    "Loading..."
                  }
                  readOnly
                />
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