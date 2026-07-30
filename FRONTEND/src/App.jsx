import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/list";
import Hotel from "./pages/hotel/Hotel";

import { SearchContextProvider } from "./components/context/searchContext";
import Login from "./pages/login/Login";

function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;