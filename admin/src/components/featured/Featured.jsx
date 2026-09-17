import "./featured.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";
  
const Featured = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_URL}/bookings`, {
          withCredentials: true,
        });

        const bookingData = Array.isArray(res.data) ? res.data : [];

        setBookings(bookingData);
      } catch (error) {
        console.log(
          "FEATURED BOOKING ERROR:",
          error.response?.data || error.message
        );
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const isConfirmed = (booking) => booking.status === "Confirmed";

  const getAmount = (booking) => Number(booking.totalPrice || 0);

  const getDate = (booking) => new Date(booking.createdAt);

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfLast7Days = new Date();
  startOfLast7Days.setDate(now.getDate() - 7);

  const startOfLast30Days = new Date();
  startOfLast30Days.setDate(now.getDate() - 30);

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const todayRevenue = bookings
    .filter((booking) => {
      const date = getDate(booking);

      return (
        isConfirmed(booking) &&
        date >= startOfToday &&
        date <= now
      );
    })
    .reduce((total, booking) => total + getAmount(booking), 0);

  const lastWeekRevenue = bookings
    .filter((booking) => {
      const date = getDate(booking);

      return (
        isConfirmed(booking) &&
        date >= startOfLast7Days &&
        date <= now
      );
    })
    .reduce((total, booking) => total + getAmount(booking), 0);

  const lastMonthRevenue = bookings
    .filter((booking) => {
      const date = getDate(booking);

      return (
        isConfirmed(booking) &&
        date >= startOfLast30Days &&
        date <= now
      );
    })
    .reduce((total, booking) => total + getAmount(booking), 0);

  const monthlyRevenue = bookings
    .filter((booking) => {
      const date = getDate(booking);

      return (
        isConfirmed(booking) &&
        date >= startOfMonth &&
        date <= now
      );
    })
    .reduce((total, booking) => total + getAmount(booking), 0);

  const totalRevenue = bookings
    .filter(isConfirmed)
    .reduce((total, booking) => total + getAmount(booking), 0);

  const todayPercentage =
    totalRevenue > 0
      ? Math.min(Math.round((todayRevenue / totalRevenue) * 100), 100)
      : 0;

  if (loading) {
    return (
      <div className="featured">
        <div className="featuredItem">
          <span>Loading revenue...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="itemTitle">Total Sales Made Today</span>

        <div className="featuredChart">
          <CircularProgressbar
            value={todayPercentage}
            text={`${todayPercentage}%`}
            strokeWidth={5}
          />
        </div>

        <p className="title">Today's Revenue</p>

        <p className="amount">
          ₹{todayRevenue.toLocaleString("en-IN")}
        </p>

        <p className="desc">
          Confirmed bookings generated today
        </p>

        <div className="summary">
          <div className="item">
            <div className="itemTitle">Last 7 Days</div>
            <div className="itemResult positive">
              ₹{lastWeekRevenue.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Last 30 Days</div>
            <div className="itemResult positive">
              ₹{lastMonthRevenue.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">This Month</div>
            <div className="itemResult positive">
              ₹{monthlyRevenue.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="item">
            <div className="itemTitle">Total Revenue</div>
            <div className="itemResult positive">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;