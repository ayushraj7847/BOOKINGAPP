import "./footer.css";
import {
  faGlobe,
  faBuilding,
  faCity,
  faLocationDot,
  faPlaneDeparture,
  faHotel,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <div className="footer">

      <div className="footerGrid">

        <div className="footerColumn">
          <h3>
            <FontAwesomeIcon icon={faGlobe} />
            Countries
          </h3>

          <ul>
            <li>India <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>United States <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>United Kingdom <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Australia <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Canada <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Thailand <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Japan <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Maldives <FontAwesomeIcon icon={faChevronRight}/></li>
          </ul>
        </div>

        <div className="footerColumn">
          <h3>
            <FontAwesomeIcon icon={faBuilding} />
            Regions
          </h3>

          <ul>
            <li>Asia <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Europe <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>North America <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>South America <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Middle East <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Africa <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Oceania <FontAwesomeIcon icon={faChevronRight}/></li>
          </ul>
        </div>

        <div className="footerColumn">
          <h3>
            <FontAwesomeIcon icon={faCity} />
            City
          </h3>

          <ul>
            <li>New Delhi <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Mumbai <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Bangalore <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Kolkata <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Hyderabad <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Chennai <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Goa <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Pune <FontAwesomeIcon icon={faChevronRight}/></li>
          </ul>
        </div>

        <div className="footerColumn">
          <h3>
            <FontAwesomeIcon icon={faLocationDot} />
            Districts
          </h3>

          <ul>
            <li>Central Delhi <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>South Delhi <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>North Delhi <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>West Delhi <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>East Delhi <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>New Delhi <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Mumbai City <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Bangalore Urban <FontAwesomeIcon icon={faChevronRight}/></li>
          </ul>
        </div>

        <div className="footerColumn">
          <h3>
            <FontAwesomeIcon icon={faPlaneDeparture} />
            Airports
          </h3>

          <ul>
            <li>Delhi (DEL) <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Mumbai (BOM) <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Bangalore (BLR) <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Kolkata (CCU) <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Chennai (MAA) <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Hyderabad (HYD) <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Goa (GOI) <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Kochi (COK) <FontAwesomeIcon icon={faChevronRight}/></li>
          </ul>
        </div>

        <div className="footerColumn">
          <h3>
            <FontAwesomeIcon icon={faHotel} />
            Hotels
          </h3>

          <ul>
            <li>Luxury Hotels <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Budget Hotels <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Boutique Hotels <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Resorts <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Villas <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Apartments <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Hostels <FontAwesomeIcon icon={faChevronRight}/></li>
            <li>Cabins <FontAwesomeIcon icon={faChevronRight}/></li>
          </ul>
        </div>

      </div>

      <div className="footerBottom">
        © 2026 AyushBooking. All rights reserved.
      </div>

    </div>
  );
};

export default Footer;