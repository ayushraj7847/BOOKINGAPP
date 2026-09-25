import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewRoom from "./pages/newRoom/NewRoom";
import NewHotel from "./pages/newHotel/NewHotel";
import Profile from "./pages/profile/Profile";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { userInputs } from "./formSource";

import "./style/dark.scss";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";

import {
  hotelColumns,
  roomColumns,
  userColumns,
  bookingColumns,
} from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  // Protect admin pages
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!user.isAdmin) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* ================= USERS ================= */}

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <List columns={userColumns} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/:userId"
            element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/new"
            element={
              <ProtectedRoute>
                <New
                  inputs={userInputs}
                  title="Add New User"
                />
              </ProtectedRoute>
            }
          />

          {/* ================= HOTELS ================= */}

          <Route
            path="/hotels"
            element={
              <ProtectedRoute>
                <List columns={hotelColumns} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hotels/:hotelId"
            element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hotels/new"
            element={
              <ProtectedRoute>
                <NewHotel />
              </ProtectedRoute>
            }
          />

          {/* ================= ROOMS ================= */}

          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <List columns={roomColumns} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rooms/:hotelId"
            element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rooms/new"
            element={
              <ProtectedRoute>
                <NewRoom />
              </ProtectedRoute>
            }
          />

          {/* ================= BOOKINGS ================= */}

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <List columns={bookingColumns} />
              </ProtectedRoute>
            }
          />

          {/* ================= PROFILE ================= */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Unknown route */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;