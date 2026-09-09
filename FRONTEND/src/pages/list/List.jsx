import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../components/context/searchContext";

const List = () => {
  const location = useLocation();

  const { date, options } = useContext(SearchContext);

  const searchParams = new URLSearchParams(
    location.search
  );

  const cityFromURL = searchParams.get("city");
  const typeFromURL = searchParams.get("type");

  const destination = cityFromURL || "";

  let query = `/hotels?min=0&max=99999`;

  if (cityFromURL) {
    query += `&city=${encodeURIComponent(cityFromURL)}`;
  }

  if (typeFromURL) {
    query += `&type=${encodeURIComponent(typeFromURL)}`;
  }

  const { data, loading, error } = useFetch(query);

  return (
    <div>
      <Navbar />

      <Header type="list" />

      <div className="listContainer">
        <div className="listResult">

          {loading && <h2>Loading...</h2>}

          {error && (
            <h2>Something went wrong!</h2>
          )}

          {!loading &&
            !error &&
            data.length === 0 && (
              <h2>
                No properties found
                {destination && ` in ${destination}`}
                {typeFromURL && ` for ${typeFromURL}`}
              </h2>
            )}

          {!loading &&
            !error &&
            data.map((item) => (
              <SearchItem
                item={item}
                key={item._id}
              />
            ))}

        </div>
      </div>
    </div>
  );
};

export default List;