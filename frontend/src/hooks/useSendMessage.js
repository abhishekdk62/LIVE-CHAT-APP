import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    if (!selectedConversation) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Fixed syntax
          },
          credentials: "include", // Fixed syntax
          body: JSON.stringify({ message }), // Fixed syntax
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data || "Failed to send message");

      // Append new message to the messages state
      setMessages([...messages, data]); 
      
    } catch (error) {
      toast.error("Error sending message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
