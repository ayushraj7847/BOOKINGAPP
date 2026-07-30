import "./featured.css";
import useFetch from "../../hooks/useFetch";

export default function Featured() {
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=Delhi,Mumbai,Bangalore,Kolkata"
  );

  const cities = [
    {
      name: "Delhi",
      image:
        "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg",
    },
    {
      name: "Mumbai",
      image:
        "https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg",
    },
    {
      name: "Bangalore",
      image:
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    },
    {
      name: "Kolkata",
      image:
        "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg",
    },
  ];

  if (loading) {
    return <h2>Loading... Please wait</h2>;
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="featuredSection">
      <div className="featuredHeader">
        <h2>⭐ Top Destinations</h2>
        <span>View all destinations →</span>
      </div>

      <div className="featured">
        {cities.map((item, index) => (
          <div className="featuredItem" key={index}>
            <img
              src={item.image}
              alt={item.name}
              className="featuredImg"
            />

            <div className="featuredOverlay">
              <div className="featuredTitles">
                <h1>{item.name}</h1>
                <h2>📍 {data[index]|| 0} Properties</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}