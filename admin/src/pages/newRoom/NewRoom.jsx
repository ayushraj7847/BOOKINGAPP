import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";

import useFetch from "../../context/hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState("");
  const [rooms, setRooms] = useState("");

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

      const roomNumbers = rooms
        .split(",")
        .map((room) => ({
          number: Number(room.trim())
        }));

      console.log("ROOM INFO:", info);
      console.log("ROOM NUMBERS:", roomNumbers);
      console.log("HOTEL ID:", hotelId);

      if (!hotelId) {
        console.log("HOTEL ID IS UNDEFINED");
        return;
      }

      const res = await axios.post(
        `http://localhost:8800/api/rooms/${hotelId}`,
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

    } catch(error) {

      console.log("ROOM CREATE ERROR:", error);

      console.log(
        "ERROR DATA:",
        error.response?.data
      );

      console.log(
        "ERROR STATUS:",
        error.response?.status
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

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>

                  <label>{input.label}</label>

                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />

                </div>
              ))}


              <div className="formInput">

                <label>Rooms</label>

                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Give comma between room numbers."
                />

              </div>


              <div className="formInput">

                <label>Choose a hotel</label>

                <select
                  id="hotelId"
                  value={hotelId}
                  onChange={(e) => {
                    setHotelId(e.target.value);
                    console.log("SELECTED HOTEL ID:", e.target.value);
                  }}
                >

                  {loading
                    ? <option>Loading...</option>
                    : data &&
                      data.map((hotel) => (
                        <option
                          key={hotel._id}
                          value={hotel._id}
                        >
                          {hotel.name}
                        </option>
                      ))}

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