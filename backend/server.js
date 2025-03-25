const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const { server, app } = require("./socket/socket");
const path = require("path");

dotenv.config();

// CORS configuration to allow requests from http://localhost:3000
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE",  // Allow specific methods (optional)
  credentials: true,               // Allow cookies if needed
};

app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist"))); // ✅ Correct path

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // ✅ Correct path
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
