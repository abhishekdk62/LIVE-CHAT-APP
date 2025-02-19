import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  // 🔥 This ensures cookies are sent with the request
      });
      
      const data = await res.json(); // Add await here
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message || "An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading }; // Return logout and loading
};

export default useLogout;
