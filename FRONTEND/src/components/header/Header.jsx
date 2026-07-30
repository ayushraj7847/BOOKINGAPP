import "./header.css";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/searchContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]:
        operation === "i"
          ? prev[name] + 1
          : prev[name] - 1,
    }));
  };
 
  const {dispatch} = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
    navigate("/hotels", {
      state: {
        destination,
        date,
        options,
      },
    });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list"
            ? "headerContainer listMode"
            : "headerContainer"
        }
      >
        {/* HEADER MENU */}

        

        {type !== "list" && (
          <>
            {/* HERO SECTION */}

            <div className="heroSection">
              <div className="heroLeft">
                <div className="offerTag">
                  EXCLUSIVE OFFERS
                </div>

                <h1 className="headerTitle">
                  A lifetime of discounts?
                  <br />
                  <span>It's Genius</span>
                </h1>

                <p className="headerDesc">
                  Get rewarded for your travels with
                  AyushBooking! Create a free
                  AyushBooking account and unlock
                  instant savings of 10% or more on
                  eligible stays. Enjoy exclusive
                  member-only deals, special discounts,
                  and a smoother booking experience
                  every time you travel.
                </p>

                <button className="headerBtn">
                  Sign in / Register
                </button>
              </div>

              <div className="heroRight"></div>
            </div>

            {/* SEARCH */}

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faBed}
                  className="headerIcon"
                />

                <input
                  type="text"
                  placeholder="Where are you going"
                  className="headerSearchInput"
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                />
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerIcon"
                />

                <span
                  className="headerSearchText"
                  onClick={() =>
                    setOpenDate(!openDate)
                  }
                >
                  {`${format(
                    date[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>

                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) =>
                      setDate([item.selection])
                    }
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faPerson}
                  className="headerIcon"
                />

                <span
                  className="headerSearchText"
                  onClick={() =>
                    setOpenOptions(!openOptions)
                  }
                >
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>

                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">
                        Adult
                      </span>

                      <div className="optionCounter">
                        <button
                          disabled={
                            options.adult <= 1
                          }
                          className="optionCounterButton"
                          onClick={() =>
                            handleOption(
                              "adult",
                              "d"
                            )
                          }
                        >
                          -
                        </button>

                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>

                        <button
                          className="optionCounterButton"
                          onClick={() =>
                            handleOption(
                              "adult",
                              "i"
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">
                        Children
                      </span>

                      <div className="optionCounter">
                        <button
                          disabled={
                            options.children <= 0
                          }
                          className="optionCounterButton"
                          onClick={() =>
                            handleOption(
                              "children",
                              "d"
                            )
                          }
                        >
                          -
                        </button>

                        <span className="optionCounterNumber">
                          {options.children}
                        </span>

                        <button
                          className="optionCounterButton"
                          onClick={() =>
                            handleOption(
                              "children",
                              "i"
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">
                        Room
                      </span>

                      <div className="optionCounter">
                        <button
                          disabled={
                            options.room <= 1
                          }
                          className="optionCounterButton"
                          onClick={() =>
                            handleOption(
                              "room",
                              "d"
                            )
                          }
                        >
                          -
                        </button>

                        <span className="optionCounterNumber">
                          {options.room}
                        </span>

                        <button
                          className="optionCounterButton"
                          onClick={() =>
                            handleOption(
                              "room",
                              "i"
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="headerSearchItem">
                <span
                  className="headerBtn"
                  onClick={handleSearch}
                >
                  Search
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;