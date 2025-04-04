const mongoose = require("mongoose");
const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    
    console.log("connected to datsabase");
  } catch (error) {
    console.log("Error connecting to database", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
