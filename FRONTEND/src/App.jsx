import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/Home";
import List from "./pages/list/List.jsx";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import MyBookings from "./pages/myBookings/MyBookings";
import Register from "./pages/register/Register";
import Partner from "./pages/partner/Partner";

import {
  SearchContextProvider,
} from "./components/context/searchContext";

function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/hotels"
            element={<List />}
          />

          <Route
            path="/hotels/:id"
            element={<Hotel />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/mybookings"
            element={<MyBookings />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Partner */}
          <Route
            path="/partner"
            element={<Partner />}
          />

        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;