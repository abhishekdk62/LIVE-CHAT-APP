const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://live-chat-app-prod.onrender.com/", // Change this to match your frontend URL
    methods: ["GET", "POST"], // Methods should be in an array
  },
});
const userSocketMap = {};

 const getReceiverSocketId=(receiverId)=>{
  return userSocketMap[receiverId]
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server,getReceiverSocketId};
