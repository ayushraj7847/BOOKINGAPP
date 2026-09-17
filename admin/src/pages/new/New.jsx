import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";
  
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      // Upload image to Cloudinary
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/demvu46na/image/upload",
        data
      );

      const { url } = uploadRes.data;

      // Create new user
      const newUser = {
        ...info,
        img: url,
      };

      await axios.post(
        `${API_URL}/auth/register`,
        newUser,
        {
          withCredentials: true,
        }
      );

      console.log("USER CREATED SUCCESSFULLY");

      // Reset form
      setInfo("");
      setFile("");
    } catch (error) {
      console.log(
        "CREATE USER ERROR:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="new">
      <Sidebar />

      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">

          {/* Image */}
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          {/* Form */}
          <div className="right">
            <form onSubmit={handleClick}>

              {/* Upload image */}
              <div className="formInput">
                <label htmlFor="file">
                  Image:
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>

                <input
                  type="file"
                  id="file"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                  style={{ display: "none" }}
                />
              </div>

              {/* Dynamic inputs */}
              {inputs.map((input) => (
                <div
                  className="formInput"
                  key={input.id}
                >
                  <label>{input.label}</label>

                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}

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

export default New;