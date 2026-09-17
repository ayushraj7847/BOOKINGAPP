import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="homeContainer">
        <Navbar />

        {/* Dashboard widgets */}
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>

        {/* Revenue section */}
        <div className="charts">
          <Featured />
          <Chart aspect={2 / 1} />
        </div>

        {/* Latest bookings */}
        <div className="listContainer">
          <div className="listTitle">
            Latest Transactions
          </div>

          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;