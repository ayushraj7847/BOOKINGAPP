import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchitem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../components/context/searchContext";

const List = () => {
  const location = useLocation();

  const {
    city,
    date,
    options,
  } = useContext(SearchContext);

  const searchParams = new URLSearchParams(
    location.search
  );

  const cityFromURL = searchParams.get("city");
  const typeFromURL = searchParams.get("type");

  // URL city has highest priority
  // When only property type is selected, ignore old SearchContext city
  const searchedCity = cityFromURL
    ? cityFromURL.trim()
    : typeFromURL
    ? ""
    : city?.trim() || "";

  let query = `/hotels?min=0&max=99999`;

  // Filter by selected city
  if (searchedCity) {
    query += `&city=${encodeURIComponent(
      searchedCity
    )}`;
  }

  // Filter by selected property type
  if (typeFromURL) {
    query += `&type=${encodeURIComponent(
      typeFromURL
    )}`;
  }

  const {
    data,
    loading,
    error,
  } = useFetch(query);

  return (
    <div>
      <Navbar />

      <Header type="list" />

      <div className="listContainer">
        <div className="listResult">

          {loading && (
            <h2>Loading...</h2>
          )}

          {error && (
            <h2>
              Something went wrong!
            </h2>
          )}

          {!loading &&
            !error &&
            data.length === 0 && (
              <h2>
                No properties found
                {searchedCity &&
                  ` in ${searchedCity}`}
                {typeFromURL &&
                  ` for ${typeFromURL}`}
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