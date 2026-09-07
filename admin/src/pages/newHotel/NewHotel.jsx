import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource.js";
import axios from "axios";
import useFetch from "../../context/hooks/useFetch";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );

    setRooms(value);
  };

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();

          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/demvu46na/image/upload",
            data,
          );

          const { url } = uploadRes.data;

          return url;
        }),
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post(
        "http://localhost:8800/api/hotels",
        newhotel
      );

      console.log("Hotel has been created");
    } catch (error) {
      console.log(
        "HOTEL CREATE ERROR:",
        error.response?.data || error
      );
    }
  };

  return (
    <div className="new">
      <Sidebar />

      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1>Add New Hotel</h1>
        </div>

        <div className="bottom">

          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right">

            <form onSubmit={handleClick}>

              <div className="formInput">

                <label htmlFor="file">
                  Image:
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>

                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />

              </div>


              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>

                  <label>{input.label}</label>

                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />

                </div>
              ))}


              <div className="formInput">

                <label>Featured</label>

                <select
                  id="featured"
                  onChange={handleChange}
                >
                  <option value={false}>
                    NO
                  </option>

                  <option value={true}>
                    YES
                  </option>
                </select>

              </div>


              <div className="selectRooms">

                <label>Rooms</label>

                <select
                  id="rooms"
                  multiple
                  onChange={handleSelect}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option
                          key={room._id}
                          value={room._id}
                        >
                          {room.title}
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

export default NewHotel;