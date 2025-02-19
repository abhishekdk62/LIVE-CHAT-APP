import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'; // Corrected import for BrowserRouter
import { SocketContextProvider } from "./context/SocketContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthContextProvider>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
