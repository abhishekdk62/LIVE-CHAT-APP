const jwt = require("jsonwebtoken");

const genetateTokenAndsetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    httpOnly: true,  // Prevents XSS attacks
    secure: process.env.NODE_ENV === "production", // Secure only in production
    sameSite: "strict",  // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

module.exports = genetateTokenAndsetCookie;
