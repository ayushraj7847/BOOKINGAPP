import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    "/hotels/countByType"
  );

  const propertyTypes = [
    {
      type: "hotel",
      title: "Hotels",
      image:
        "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      icon: "🏨",
    },
    {
      type: "apartment",
      title: "Apartments",
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      icon: "🏢",
    },
    {
      type: "resort",
      title: "Resorts",
      image:
        "https://images.pexels.com/photos/261388/pexels-photo-261388.jpeg",
      icon: "🏝️",
    },
    {
      type: "villa",
      title: "Villas",
      image:
        "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      icon: "🏡",
    },
    {
      type: "cottage",
      title: "Cottages",
      image:
        "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      icon: "🏕️",
    },
    {
      type: "hostel",
      title: "Hostels",
      image:
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      icon: "🏨",
    },
  ];

  if (loading) {
    return <h2>Loading... Please wait</h2>;
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div>

      <div className="pList">

        {propertyTypes.map((item, index) => (
          <div
            className="pListItem"
            key={item.type}
            onClick={() =>
              navigate(`/hotels?type=${item.type}`)
            }
          >

            <img
              src={item.image}
              alt={item.title}
              className="pListImage"
            />

            <div className="pListOverlay">

              <div className="propertyIcon">
                {item.icon}
              </div>

              <div className="pListTitles">

                <h1>{item.title}</h1>

                <h2>
                  {data[index]?.count || 0} Properties
                </h2>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default PropertyList;