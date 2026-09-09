import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/list";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";

import { SearchContextProvider } from "./components/context/searchContext";
import MyBookings from "./pages/myBookings/MyBookings";
import Register from "./pages/register/Register";

function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;