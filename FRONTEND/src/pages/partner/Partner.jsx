import "./partner.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBuilding,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const Partner = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdHotel, setCreatedHotel] = useState(null);
  const [openType, setOpenType] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    adminPassword: "",
    type: "hotel",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    rating: "",
    cheapestPrice: "",
    featured: false,
  });

  const propertyTypes = [
    {
      value: "hotel",
      label: "Hotel",
    },
    {
      value: "apartment",
      label: "Apartment",
    },
    {
      value: "flat",
      label: "Flat",
    },
    {
      value: "villa",
      label: "Villa",
    },
    {
      value: "resort",
      label: "Resort",
    },
    {
      value: "hostel",
      label: "Hostel",
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter property name");
      return;
    }

    if (!formData.adminPassword.trim()) {
      alert("Please create a property admin password");
      return;
    }

    if (!formData.city.trim()) {
      alert("Please enter city");
      return;
    }

    if (!formData.address.trim()) {
      alert("Please enter property address");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter property title");
      return;
    }

    if (!formData.desc.trim()) {
      alert("Please enter property description");
      return;
    }

    if (!formData.cheapestPrice) {
      alert("Please enter starting price");
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);

      const imageUrls = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();

          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/demvu46na/image/upload",
            data
          );

          return uploadRes.data.url;
        })
      );

      const propertyData = {
        ...formData,
        rating: formData.rating
          ? Number(formData.rating)
          : undefined,
        cheapestPrice: Number(formData.cheapestPrice),
        featured:
          formData.featured === true ||
          formData.featured === "true",
        photos: imageUrls,
        rooms: [],
      };

      const res = await axios.post(
        `${API_URL}/hotels`,
        propertyData,
        {
          withCredentials: true,
        }
      );

      console.log(
        "PARTNER PROPERTY CREATED:",
        res.data
      );

      setCreatedHotel(res.data);
      setSuccess(true);

      setFormData({
        name: "",
        adminPassword: "",
        type: "hotel",
        city: "",
        address: "",
        distance: "",
        title: "",
        desc: "",
        rating: "",
        cheapestPrice: "",
        featured: false,
      });

      setFiles([]);
      setOpenType(false);
    } catch (error) {
      console.log(
        "PARTNER CREATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Property creation failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedType =
    propertyTypes.find(
      (item) => item.value === formData.type
    ) || propertyTypes[0];

  return (
    <div className="partnerPage">
      <div className="partnerHeader">
        <button
          className="partnerBack"
          onClick={() => navigate("/")}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Stayvora
        </button>

        <div className="partnerLogo">
          ✧ Stayvora ✧
        </div>
      </div>

      <div className="partnerContainer">
        <div className="partnerIntro">
          <div className="partnerIcon">
            <FontAwesomeIcon icon={faBuilding} />
          </div>

          <h1>List Your Property</h1>

          <p>
            Partner with Stayvora and add your hotel,
            apartment, villa or other property.
          </p>
        </div>

        {success ? (
          <div className="partnerSuccess">
            <h2>
              Property Created Successfully!
            </h2>

            <p>
              Your property has been added to Stayvora.
            </p>

            {createdHotel && (
              <div className="hotelCredentials">
                <div>
                  <strong>Property Name</strong>
                  <span>{createdHotel.name}</span>
                </div>

                <div>
                  <strong>Hotel ID</strong>
                  <span>{createdHotel._id}</span>
                </div>
              </div>
            )}

            <p className="loginInfo">
              Use your property name or Hotel ID and
              the password you created to access the
              Admin panel.
            </p>

            <div className="successButtons">
              <button
                type="button"
                onClick={() => navigate("/")}
              >
                Back to Stayvora
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "https://stayvora-admin.vercel.app/login";
                }}
              >
                Go to Admin
              </button>
            </div>
          </div>
        ) : (
          <form
            className="partnerForm"
            onSubmit={handleSubmit}
          >
            <div className="formSection">
              <h2>Property Information</h2>

              <div className="formGrid">
                <div className="partnerInput">
                  <label>Property Name</label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Grand Palace Hotel"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="partnerInput">
                  <label>Property Type</label>

                  <div className="typeDropdown">
                    <button
                      type="button"
                      className="typeDropdownButton"
                      onClick={() =>
                        setOpenType(
                          (prev) => !prev
                        )
                      }
                    >
                      <span>
                        {selectedType.label}
                      </span>

                      <span className="typeArrow">
                        {openType ? "▲" : "▼"}
                      </span>
                    </button>

                    {openType && (
                      <div className="typeDropdownMenu">
                        {propertyTypes.map(
                          (item) => (
                            <button
                              type="button"
                              key={item.value}
                              className={`typeDropdownOption ${
                                formData.type ===
                                item.value
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => {
                                setFormData(
                                  (prev) => ({
                                    ...prev,
                                    type:
                                      item.value,
                                  })
                                );

                                setOpenType(false);
                              }}
                            >
                              {item.label}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="partnerInput">
                  <label>City</label>

                  <input
                    id="city"
                    type="text"
                    placeholder="Delhi"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="partnerInput">
                  <label>Distance</label>

                  <input
                    id="distance"
                    type="text"
                    placeholder="1 km from city centre"
                    value={formData.distance}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="partnerInput full">
                <label>Address</label>

                <input
                  id="address"
                  type="text"
                  placeholder="Complete property address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formSection">
              <h2>Property Details</h2>

              <div className="partnerInput">
                <label>Property Title</label>

                <input
                  id="title"
                  type="text"
                  placeholder="Luxury stay in the heart of Delhi"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="partnerInput">
                <label>Description</label>

                <textarea
                  id="desc"
                  rows="5"
                  placeholder="Describe your property..."
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>

              <div className="formGrid">
                <div className="partnerInput">
                  <label>Rating</label>

                  <input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.5"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>

                <div className="partnerInput">
                  <label>Starting Price</label>

                  <input
                    id="cheapestPrice"
                    type="number"
                    min="1"
                    placeholder="1500"
                    value={
                      formData.cheapestPrice
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="formSection">
              <h2>Admin Account</h2>

              <p className="sectionInfo">
                This password will be used to access
                your property admin dashboard.
              </p>

              <div className="partnerInput">
                <label>
                  Property Admin Password
                </label>

                <input
                  id="adminPassword"
                  type="password"
                  placeholder="Create a strong password"
                  value={
                    formData.adminPassword
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formSection">
              <h2>Property Photos</h2>

              <label
                htmlFor="propertyFiles"
                className="uploadBox"
              >
                <FontAwesomeIcon icon={faUpload} />

                <span>
                  Upload Property Images
                </span>

                <small>
                  You can select multiple images
                </small>
              </label>

              <input
                id="propertyFiles"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {files.length > 0 && (
                <div className="fileList">
                  {files.map((file, index) => (
                    <span
                      key={`${file.name}-${index}`}
                    >
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="partnerSubmit"
              disabled={loading}
            >
              {loading
                ? "Creating Property..."
                : "Create My Property"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Partner;