const User = require("../models/usermodel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); // ✅ Added missing import
const generateTokenAndSetCookie = require("../utils/generateToken"); // ✅ Corrected function name

const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const boyProfilePic = `http://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `http://avatar.iran.liara.run/public/girl?username=${userName}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res); // ✅ Fixed spelling

    res.status(201).json({ newUser });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json("Please enter all the fields");
    }

    const user = await User.findOne({ userName });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // 🔥 Correct way to generate a unique JWT for each user
        const token = jwt.sign({ userId: user._id.toString() }, "7dE33hdd", { expiresIn: "7d" });

        // 🔥 Setting the correct cookie
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true, // Remove this if running locally
          sameSite: "Lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json(user);
      } else {
        return res.status(400).json("Password mismatch");
      }
    } else {
      return res.status(400).json("User not found");
    }
  } catch (error) {
    console.log({ message: error });
    return res.status(500).json("Internal server error");
  }
};


const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0), // ✅ More reliable than maxAge: 0
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json("Internal server error...");
  }
};

module.exports = { signup, login, logout };
