import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import format from "date-fns/format";
import { DateRange } from "react-date-range";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMinus,
  FaPlus
} from "react-icons/fa";

import SearchItem from "../../components/searchitem/SearchItem";
import useFetch from "../../hooks/useFetch";


const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);

  const [date, setDate] = useState(location.state.date);

  const [openDate, setOpenDate] = useState(false);

  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
 
 const { data, loading, error, refetch } = useFetch(
  `/api/hotels?city=${destination}&min=${min || 0}&max=${max || 99999}`
);
  const handleClick = () =>{
    refetch();
  };                        

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]:
        operation === "i"
          ? prev[name] + 1
          : prev[name] - 1,
    }));
  };

  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="listContainer">

        <div className="listWrapper">

          {/* LEFT SIDEBAR */}

          <div className="listSearch">

            <h2 className="lsTitle">Search</h2>

            {/* Destination */}

            <div className="lsItem">

              <label>Destination</label>

              <div className="inputBox">

                <FaMapMarkerAlt />

                <input
                  type="text"
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                  placeholder="Where are you going?"
                />

              </div>

            </div>

            {/* Date */}

            <div className="lsItem">

              <label>Check-in / Check-out</label>

              <div
                className="inputBox"
                onClick={() => setOpenDate(!openDate)}
              >

                <FaCalendarAlt />

                <span>
                  {`${format(
                    date[0].startDate,
                    "dd MMM yyyy"
                  )} - ${format(
                    date[0].endDate,
                    "dd MMM yyyy"
                  )}`}
                </span>

              </div>
                 {openDate && (
      <DateRange
      editableDateInputs
      onChange={(item) =>
        setDate([item.selection])
      }
      moveRangeOnFirstSelection={false}
      minDate={new Date()}
      ranges={date}
      className="date"
             
                />
              )}

            </div>

            {/* Guests */}

            <div className="lsItem">

              <label>Guests & Rooms</label>

              <div className="counterRow">

                <span>Adults</span>

                <div className="counter">

                  <button
                    onClick={() =>
                      handleOption("adult", "d")
                    }
                    disabled={options.adult <= 1}
                  >
                    <FaMinus />
                  </button>

                  <span>{options.adult}</span>

                  <button
                    onClick={() =>
                      handleOption("adult", "i")
                    }
                  >
                    <FaPlus />
                  </button>

                </div>

              </div>

              <div className="counterRow">

                <span>Children</span>

                <div className="counter">

                  <button
                    onClick={() =>
                      handleOption("children", "d")
                    }
                    disabled={options.children <= 0}
                  >
                    <FaMinus />
                  </button>

                  <span>{options.children}</span>

                  <button
                    onClick={() =>
                      handleOption("children", "i")
                    }
                  >
                    <FaPlus />
                  </button>

                </div>

              </div>

              <div className="counterRow">

                <span>Rooms</span>

                <div className="counter">

                  <button
                    onClick={() =>
                      handleOption("room", "d")
                    }
                    disabled={options.room <= 1}
                  >
                    <FaMinus />
                  </button>

                  <span>{options.room}</span>

                  <button
                    onClick={() =>
                      handleOption("room", "i")
                    }
                  >
                    <FaPlus />
                  </button>

                </div>

              </div>

            </div>

            {/* Price */}

            <div className="lsItem">

              <label>Price Range</label>

              <input
                type = "number" onChange={e=>setMin(e.target.value)}
              />
              <input
                type = "number" onChange={e=>setMax(e.target.value)}
              />

              <div className="priceValues">

                <span>₹0</span>

                <span>₹10000+</span>

              </div>

            </div>

            {/* Property Type */}

            <div className="lsItem">

              <label>Property Type</label>

              <div className="checkBox">

                <label>
                  <input
  type="checkbox"
  defaultChecked
  className="propertyCheck"
/>
                  Apartments
                </label>

                <label>
                  <input type="checkbox" defaultChecked />
                  Hotels
                </label>

                <label>
                  <input type="checkbox" defaultChecked />
                  Resorts
                </label>

                <label>
                  <input type="checkbox" defaultChecked />
                  Villas
                </label>

              </div>

            </div>

            <button onClick={handleClick} className="lsSearchBtn">
              Search Properties
            </button>

          </div>

          {/* RIGHT */}

          <div className="listResult">
             {loading? "loading":<>
             {data.map(item=>(
              <SearchItem item={item} key={item. _id} />
             ))}
        
            </>}
          </div>

        </div>

      </div>
    </>
  );
};

export default List;