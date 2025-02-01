const jwt = require("jsonwebtoken");

const genetateTokenAndsetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, "7dE33hdd", {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};
module.exports = genetateTokenAndsetCookie;
