import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";
  
const Datatable = ({ columns }) => {
  const location = useLocation();

  // Get current page path
  const path = location.pathname.split("/")[1];

  // API route mapping
  const apiPath = path === "users" ? "user" : path;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch live data from Render backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(`${API_URL}/${apiPath}`, {
          withCredentials: true,
        });

        const responseData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.users || res.data?.bookings || [];

        // Format booking data for DataGrid
        const formattedData = responseData.map((item) => {
          if (path === "bookings") {
            return {
              ...item,

              // User details
              userName: item.user?.username || "N/A",
              userEmail: item.user?.email || "N/A",

              // Hotel details
              hotelName: item.hotel?.name || "N/A",
              hotelCity: item.hotel?.city || "N/A",

              // Rooms
              roomCount: Array.isArray(item.rooms)
                ? item.rooms.length
                : 0,

              // Total amount
              bookingAmount: Number(item.totalPrice || 0),

              // Booking dates
              bookingCheckIn: item.checkIn
                ? new Date(item.checkIn).toLocaleDateString("en-IN")
                : "N/A",

              bookingCheckOut: item.checkOut
                ? new Date(item.checkOut).toLocaleDateString("en-IN")
                : "N/A",

              // Created date
              bookingCreatedAt: item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-IN")
                : "N/A",
            };
          }

          return item;
        });

        setList(formattedData);
      } catch (error) {
        console.log(
          "DATATABLE FETCH ERROR:",
          error.response?.data || error.message
        );

        setError(true);
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiPath, path]);

  // Delete data
  const handleDelete = async (id) => {
    try {
      console.log("Deleting ID:", id);

      const res = await axios.delete(
        `${API_URL}/${apiPath}/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log("DELETE SUCCESS:", res.data);

      setList((prevList) =>
        prevList.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(
        "DELETE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Delete failed!"
      );
    }
  };

  // Action column
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,

      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                View
              </div>
            </Link>

            <div
              className="deleteButton"
              onClick={() =>
                handleDelete(params.row._id)
              }
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Loading
  if (loading) {
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Loading {path}...
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Error loading {path}
        </div>
      </div>
    );
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}

        <Link
          to={`/${path}/new`}
          className="link"
        >
          Add New
        </Link>
      </div>

      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;