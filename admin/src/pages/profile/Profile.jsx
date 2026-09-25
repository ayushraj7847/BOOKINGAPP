import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.scss";

const Profile = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://stayvora-backend.onrender.com/api";

  useEffect(() => {
    const getHotelProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.hotelId) {
          setError("Hotel information not found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API_URL}/hotels/find/${user.hotelId}`,
          {
            withCredentials: true,
          }
        );

        setHotel(res.data);
      } catch (err) {
        console.error("Profile error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load hotel profile."
        );
      } finally {
        setLoading(false);
      }
    };

    getHotelProfile();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="profilePage">
        <div className="profileCard">
          <h2>Loading Profile...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profilePage">
        <div className="profileCard">
          <h2>Profile</h2>
          <p className="profileError">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profilePage">
      <div className="profileHeader">
        <div>
          <h1>Hotel Profile</h1>
          <p>
            Manage and view your hotel information
          </p>
        </div>
      </div>

      <div className="profileCard">

        <div className="profileTop">
          <div className="profileAvatar">
            {hotel?.name?.charAt(0)?.toUpperCase() || "H"}
          </div>

          <div>
            <h2>{hotel?.name || "Hotel"}</h2>
            <p>
              {hotel?.city || "City not available"}
            </p>
          </div>
        </div>

        <div className="profileGrid">

          <div className="profileItem">
            <span>Hotel Name</span>
            <strong>{hotel?.name || "N/A"}</strong>
          </div>

          <div className="profileItem">
            <span>Property Type</span>
            <strong>{hotel?.type || "N/A"}</strong>
          </div>

          <div className="profileItem">
            <span>City</span>
            <strong>{hotel?.city || "N/A"}</strong>
          </div>

          <div className="profileItem">
            <span>Address</span>
            <strong>{hotel?.address || "N/A"}</strong>
          </div>

          <div className="profileItem">
            <span>Distance</span>
            <strong>{hotel?.distance || "N/A"}</strong>
          </div>

          <div className="profileItem">
            <span>Rating</span>
            <strong>
              {hotel?.rating !== undefined
                ? `${hotel.rating} / 5`
                : "N/A"}
            </strong>
          </div>

          <div className="profileItem">
            <span>Starting Price</span>
            <strong>
              ₹{hotel?.cheapestPrice || 0}
            </strong>
          </div>

          <div className="profileItem">
            <span>Featured</span>
            <strong>
              {hotel?.featured ? "Yes" : "No"}
            </strong>
          </div>

        </div>

        <div className="profileDescription">
          <span>Description</span>
          <p>
            {hotel?.desc || "No description available."}
          </p>
        </div>

        {hotel?.photos?.length > 0 && (
          <div className="profilePhotos">
            <h3>Property Photos</h3>

            <div className="photosGrid">
              {hotel.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${hotel.name} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;