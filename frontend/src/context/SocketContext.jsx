import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: { userId: authUser._id },
      });

      // Attach event listeners to newSocket (not socket)
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setSocket(newSocket); // Set socket after defining event listeners

      return () => {
        newSocket.close(); // Cleanup when component unmounts or user changes
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); // Only runs when authUser changes

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
