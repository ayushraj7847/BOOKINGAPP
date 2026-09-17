import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const Widget = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, bookingsResponse] =
          await Promise.all([
            axios.get(`${API_URL}/user`, {
              withCredentials: true,
            }),
            axios.get(`${API_URL}/bookings`, {
              withCredentials: true,
            }),
          ]);

        const usersData = Array.isArray(usersResponse.data)
          ? usersResponse.data
          : usersResponse.data?.users || [];

        const bookingsData = Array.isArray(bookingsResponse.data)
          ? bookingsResponse.data
          : bookingsResponse.data?.bookings || [];

        setUsers(usersData);
        setBookings(bookingsData);
      } catch (error) {
        console.log(
          "WIDGET DATA ERROR:",
          error.response?.data || error.message
        );

        setUsers([]);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Get confirmed bookings only
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  );

  // Total users
  const totalUsers = users.length;

  // Total bookings
  const totalBookings = bookings.length;

  // Total confirmed revenue
  const totalRevenue = confirmedBookings.reduce(
    (total, booking) =>
      total + Number(booking.totalPrice || 0),
    0
  );

  // Current balance
  const balance = totalRevenue;

  // Format rupees
  const formatMoney = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  // Widget data
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        counter: totalUsers,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        counter: totalBookings,
        link: "View all bookings",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;

    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        counter: totalRevenue,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        counter: balance,
        link: "See total revenue",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;

    default:
      data = {
        title: "",
        isMoney: false,
        counter: 0,
        link: "",
        icon: null,
      };
      break;
  }

  if (loading) {
    return (
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>

          <span className="counter">
            Loading...
          </span>

          <span className="link">
            Loading data...
          </span>
        </div>

        <div className="right">
          {data.icon}
        </div>
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">
          {data.title}
        </span>

        <span className="counter">
          {data.isMoney
            ? formatMoney(data.counter)
            : data.counter.toLocaleString("en-IN")}
        </span>

        <span className="link">
          {data.link}
        </span>
      </div>

      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          LIVE
        </div>

        {data.icon}
      </div>
    </div>
  );
};

export default Widget;