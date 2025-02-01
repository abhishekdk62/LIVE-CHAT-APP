const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json("Unauthorized - No Token Provided");
    }
    const decoded = jwt.verify(token, "7dE33hdd");

    if (!decoded) {
      return res.status(400).json("Invalid Token");
    }


const user = await User.findById(decoded.userId).select("-password");

if(!user)
{
    return res.status(400).json("user not found");

}
req.user=user

next()

  } catch (error) {
    res.status(400).json("internal server error");
    console.log({ messege: error });
  }
};

module.exports=protectedRoute