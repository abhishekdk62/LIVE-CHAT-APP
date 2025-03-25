import React from "react";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/signup/Signup";
import { useAuthContext } from "./context/AuthContext";
const App = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Toaster />
    </>
  );
};

export default App;
