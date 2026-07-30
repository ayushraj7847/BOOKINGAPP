import Featured from "../../components/featured/Featured";
import FeaturedPropeties from "../../components/featuredProperties/FeaturedPropeties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/maillist/MailList";
import Navbar from "../../components/navbar/navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />

      <div className="homeContainer">

        <Featured />

        <div className="sectionTitle">
          <h1>🏨 Browse by property type</h1>
          <span>View all property types →</span>
        </div>

        <PropertyList />

        <div className="sectionTitle">
          <h1>❤️ Homes guests love</h1>
          <span>View all properties →</span>
        </div>

        <FeaturedPropeties />

        <MailList />

        <Footer />

      </div>
    </div>
  );
};

export default Home;