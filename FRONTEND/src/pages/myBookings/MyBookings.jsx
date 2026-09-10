import "./myBookings.css";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch("/bookings/user");

  if (!user) {
    return (
      <div className="myBookings">
        <h2>Please login to see your bookings</h2>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            border: "1px solid #d4af37",
            borderRadius: "25px",
            background: "#d4af37",
            color: "#111",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="myBookings">
      <div className="myBookingsContainer">

        {/* =========================
              HEADER
        ========================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1>My Bookings</h1>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              border: "1px solid #d4af37",
              borderRadius: "25px",
              background: "#d4af37",
              color: "#111",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>
        </div>

        {/* =========================
              LOADING
        ========================= */}

        {loading && (
          <div className="bookingMessage">
            Loading your bookings...
          </div>
        )}

        {/* =========================
              ERROR
        ========================= */}

        {error && (
          <div className="bookingMessage error">
            Something went wrong!
          </div>
        )}

        {/* =========================
              NO BOOKINGS
        ========================= */}

        {!loading && !error && data.length === 0 && (
          <div className="bookingMessage">
            <h2>No bookings found</h2>

            <p>
              You haven't made any bookings yet.
            </p>
          </div>
        )}

        {/* =========================
              BOOKINGS
        ========================= */}

        {!loading && !error && data.length > 0 && (
          <div className="bookingList">

            {data.map((booking) => (
              <div
                className="bookingCard"
                key={booking._id}
              >

                {/* =========================
                      BOOKING TOP
                ========================= */}

                <div className="bookingTop">

                  <div>

                    <h2>
                      {booking.hotel?.name || "Hotel"}
                    </h2>

                    <span className="bookingCity">
                      📍 {booking.hotel?.city || "India"}
                    </span>

                  </div>

                  <span
                    className={`bookingStatus ${
                      booking.status?.toLowerCase() || "pending"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>

                </div>


                {/* =========================
                      BOOKING DETAILS
                ========================= */}

                <div className="bookingDetails">

                  <div className="bookingDetail">

                    <span>
                      Check-in
                    </span>

                    <strong>
                      {booking.checkIn
                        ? new Date(
                            booking.checkIn
                          ).toLocaleDateString("en-IN")
                        : "N/A"}
                    </strong>

                  </div>


                  <div className="bookingDetail">

                    <span>
                      Check-out
                    </span>

                    <strong>
                      {booking.checkOut
                        ? new Date(
                            booking.checkOut
                          ).toLocaleDateString("en-IN")
                        : "N/A"}
                    </strong>

                  </div>


                  <div className="bookingDetail">

                    <span>
                      Rooms
                    </span>

                    <strong>
                      {booking.rooms?.length || 0}
                    </strong>

                  </div>


                  <div className="bookingDetail">

                    <span>
                      Room No.
                    </span>

                    <strong>
                      {booking.rooms?.length > 0
                        ? booking.rooms
                            .map(
                              (room) =>
                                room.roomNumber
                            )
                            .join(", ")
                        : "N/A"}
                    </strong>

                  </div>


                  <div className="bookingDetail">

                    <span>
                      Total Price
                    </span>

                    <strong className="bookingPrice">
                      ₹{booking.totalPrice || 0}
                    </strong>

                  </div>

                </div>


                {/* =========================
                      BOOKING BOTTOM
                ========================= */}

                <div className="bookingBottom">

                  <span>
                    Booking ID: {booking._id}
                  </span>

                  <span>
                    Booked on:{" "}
                    {booking.createdAt
                      ? new Date(
                          booking.createdAt
                        ).toLocaleDateString("en-IN")
                      : "N/A"}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;