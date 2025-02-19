import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost:5000/api/users",
          { credentials: "include" } // ✅ Important for cookies
        );

        // Parse the response as JSON
        const data = await res.json();

        // If response is NOT OK, throw an error with the message from backend
        if (!res.ok) {
          throw new Error(data); // Assuming backend sends plain string
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message); // Display error message
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
