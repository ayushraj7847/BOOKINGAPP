import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";
const Chart = ({ aspect }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_URL}/bookings`, {
          withCredentials: true,
        });

        const bookings = Array.isArray(res.data)
          ? res.data
          : [];

        const now = new Date();

        const months = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date(
            now.getFullYear(),
            now.getMonth() - i,
            1
          );

          months.push({
            month: date.toLocaleString("en-US", {
              month: "short",
            }),
            year: date.getFullYear(),
            monthIndex: date.getMonth(),
            Total: 0,
          });
        }

        bookings.forEach((booking) => {
          if (booking.status !== "Confirmed") return;

          const bookingDate = new Date(booking.createdAt);
          const amount = Number(booking.totalPrice || 0);

          const matchingMonth = months.find(
            (item) =>
              item.year === bookingDate.getFullYear() &&
              item.monthIndex === bookingDate.getMonth()
          );

          if (matchingMonth) {
            matchingMonth.Total += amount;
          }
        });

        setData(months);
      } catch (error) {
        console.log(
          "CHART BOOKING ERROR:",
          error.response?.data || error.message
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="chart">Loading chart...</div>;
  }

  return (
    <div className="chart">
      <div className="title">Last 6 Months (Revenue)</div>

      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
              "Revenue",
            ]}
          />

          <Area
            type="monotone"
            dataKey="Total"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;