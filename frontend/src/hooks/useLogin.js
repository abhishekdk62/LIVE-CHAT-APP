import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"; // Import toast

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (username, password) => {
    setLoading(true); // Set loading to true while making the request
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        credentials: "include",  // 🔥 This ensures cookies are sent with the request


        body: JSON.stringify({
          userName: username, // Use correct field names
          password,
        }), // Send the username and password in the body as JSON
      });
  
      const data = await res.json(); // Parse the response JSON
  
      if (res.ok) {
        // Handle success (e.g., save token, redirect, etc.)
        console.log("login successful:", data);
        setAuthUser(data); // Set the user info if successful (adjust based on your response structure)
        localStorage.setItem("chat-user", JSON.stringify(data)); // Store token if applicable
      } else {
        // If the response is not OK, show the error message from the backend
        const errorMessage = data || "Something went wrong"; // Use the error message from the backend, or default to a generic message
        throw new Error(errorMessage); // Throw error to be caught in the catch block
      }
    } catch (error) {
      // Show the actual error message from the backend using toast
      toast.error(error.message, {
        position: "top-center", // Display the toast in the center
      });
    } finally {
      setLoading(false); // Set loading back to false after request completion
    }
  };
  

  return { login, loading };
};

export default useLogin;
