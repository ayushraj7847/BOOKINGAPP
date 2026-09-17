import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const List = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_URL}/bookings`, {
          withCredentials: true,
        });

        const bookingData = Array.isArray(res.data)
          ? res.data
          : res.data?.bookings || [];

        // Show latest 5 bookings
        const latestBookings = bookingData.slice(0, 5);

        setRows(latestBookings);
      } catch (error) {
        console.log(
          "TABLE BOOKING ERROR:",
          error.response?.data || error.message
        );

        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusClass = (status) => {
    if (!status) return "pending";

    return status.toLowerCase() === "confirmed"
      ? "approved"
      : "pending";
  };

  if (loading) {
    return (
      <TableContainer component={Paper} className="table">
        <div style={{ padding: "20px" }}>
          Loading latest bookings...
        </div>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="booking table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">
              Booking ID
            </TableCell>

            <TableCell className="tableCell">
              Hotel
            </TableCell>

            <TableCell className="tableCell">
              Customer
            </TableCell>

            <TableCell className="tableCell">
              Date
            </TableCell>

            <TableCell className="tableCell">
              Amount
            </TableCell>

            <TableCell className="tableCell">
              Rooms
            </TableCell>

            <TableCell className="tableCell">
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row._id}>

                {/* Booking ID */}
                <TableCell className="tableCell">
                  {row._id?.slice(-8)}
                </TableCell>

                {/* Hotel */}
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <div
                      className="image"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f0f0f0",
                        marginRight: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {row.hotel?.name
                        ? row.hotel.name.charAt(0).toUpperCase()
                        : "H"}
                    </div>

                    {row.hotel?.name || "Unknown Hotel"}
                  </div>
                </TableCell>

                {/* Customer */}
                <TableCell className="tableCell">
                  {row.user?.username || "Unknown User"}
                </TableCell>

                {/* Booking Date */}
                <TableCell className="tableCell">
                  {row.createdAt
                    ? new Date(
                        row.createdAt
                      ).toLocaleDateString("en-IN")
                    : "N/A"}
                </TableCell>

                {/* Total Price */}
                <TableCell className="tableCell">
                  ₹
                  {Number(
                    row.totalPrice || 0
                  ).toLocaleString("en-IN")}
                </TableCell>

                {/* Number of Rooms */}
                <TableCell className="tableCell">
                  {Array.isArray(row.rooms)
                    ? row.rooms.length
                    : 0}
                </TableCell>

                {/* Status */}
                <TableCell className="tableCell">
                  <span
                    className={`status ${getStatusClass(
                      row.status
                    )}`}
                  >
                    {row.status || "Pending"}
                  </span>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
                className="tableCell"
              >
                No bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;