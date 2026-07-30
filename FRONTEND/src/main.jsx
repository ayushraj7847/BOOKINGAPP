import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchContextProvider } from "./components/context/searchContext.jsx";
import { AuthContextProvider } from "./components/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);