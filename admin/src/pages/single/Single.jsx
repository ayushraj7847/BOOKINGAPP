import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import useFetch from "../../context/hooks/useFetch";

const Single = () => {
  const location = useLocation();

  // Get ID from URL
  const id = location.pathname.split("/")[2];

  // Get current page
  const path = location.pathname.split("/")[1];

  // API route mapping
  const apiPath = path === "users" ? "user" : path;

  const {
    data,
    loading,
    error,
  } = useFetch(`/${apiPath}/${id}`);

  const user = Array.isArray(data) ? data[0] : data;

  if (loading) {
    return (
      <div className="single">
        <Sidebar />

        <div className="singleContainer">
          <Navbar />

          <div
            style={{
              padding: "40px",
              fontSize: "20px",
            }}
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="single">
        <Sidebar />

        <div className="singleContainer">
          <Navbar />

          <div
            style={{
              padding: "40px",
              fontSize: "20px",
            }}
          >
            Error loading data.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="single">
      <Sidebar />

      <div className="singleContainer">
        <Navbar />

        <div className="top">

          {/* User information */}
          <div className="left">
            <div className="editButton">
              Edit
            </div>

            <h1 className="title">
              Information
            </h1>

            <div className="item">

              <img
                src={
                  user?.img ||
                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                className="itemImg"
              />

              <div className="details">

                <h1 className="itemTitle">
                  {user?.username ||
                    user?.name ||
                    "N/A"}
                </h1>

                <div className="detailItem">
                  <span className="itemKey">
                    Email:
                  </span>

                  <span className="itemValue">
                    {user?.email || "N/A"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">
                    Phone:
                  </span>

                  <span className="itemValue">
                    {user?.phone || "N/A"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">
                    Address:
                  </span>

                  <span className="itemValue">
                    {user?.address || "N/A"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">
                    Country:
                  </span>

                  <span className="itemValue">
                    {user?.country || "India"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">
                    User ID:
                  </span>

                  <span className="itemValue">
                    {user?._id || id}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="right">
            <Chart aspect={3 / 1} />
          </div>

        </div>

        {/* Latest transactions */}
        <div className="bottom">

          <h1 className="title">
            Last Transactions
          </h1>

          <List />

        </div>

      </div>
    </div>
  );
};

export default Single;