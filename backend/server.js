const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoutes');
const app = express();


dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);





const PORT = 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on http://localhost:${PORT}`);
});

