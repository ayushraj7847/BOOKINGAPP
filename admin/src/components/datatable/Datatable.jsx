import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../context/hooks/useFetch.js";
import axios from "axios";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  // API route mapping
  const apiPath = path === "users" ? "user" : path;

  const [list, setList] = useState([]);

  const { data, loading, error } = useFetch(`/${apiPath}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
  try {
    console.log("Deleting user ID:", id);

    const res = await axios.delete(
      `http://localhost:8800/api/user/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log("DELETE SUCCESS:", res.data);

    setList((prevList) =>
      prevList.filter((item) => item._id !== id)
    );

  } catch (error) {
    console.log("DELETE ERROR FULL:", error);

    console.log(
      "DELETE ERROR DATA:",
      error.response?.data
    );

    console.log(
      "DELETE ERROR MESSAGE:",
      error.response?.data?.message
    );

    console.log(
      "DELETE ERROR STACK:",
      error.response?.data?.stack
    );
  }
};

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,

      renderCell: (params) => {
        return (
          <div className="cellAction">

            <Link
              to="/users/test"
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                View
              </div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>

          </div>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="datatable">

      <div className="datatableTitle">
         {path}

        <Link to={`/${path}/new`} className="link">
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