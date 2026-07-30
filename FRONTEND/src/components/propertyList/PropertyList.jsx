import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faBuilding,
  faUmbrellaBeach,
  faHouse,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

const properties = [
  {
    name: "Hotels",
    icon: faHotel,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Apartments",
    icon: faBuilding,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Resorts",
    icon: faUmbrellaBeach,
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Villas",
    icon: faHouse,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cottages",
    icon: faTree,
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Hostels",
    icon: faHotel,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  },
];

const PropertyList = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByType");

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="pList">
      {properties.map((item, index) => (
        <div className="pListItem" key={index}>
          <img
            src={item.image}
            alt={item.name}
            className="pListImage"
          />

          <div className="pListOverlay">
            <div className="propertyIcon">
              <FontAwesomeIcon icon={item.icon} />
            </div>

            <div className="pListTitles">
              <h1>{item.name}</h1>
              <h2>{data[index]?.count || 0} Properties</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;