const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const genetateTokenAndsetCookie = require("../utils/generateToken");
const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do no match" });
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
    genetateTokenAndsetCookie(newUser._id, res);

    res.status(201).json({ newUser });
  } catch (error) {
    console.log("Error in signup controller", error.message);

    res.status(500).json({ error: "Internal server Error" });
  }
};
const login = async (req, res) => {

try {
  const{userName,password}=req.body

  const user= await User.findOne({userName})

  if(user)
  {
    const isMatch=await bcrypt.compare(password,user.password)
    if(isMatch)
    {
      genetateTokenAndsetCookie(user._id,res)
      res.status(200).json("login successfull")
    }
    else{
      res.status(400).json("password mismatch")
    }
  }
  else{
    res.status(400).json("user not found")
  }

  
} catch (error) {

  res.status(400).json("Internal server error")
  console.log({message:error});
  
  
}


};
const logout = async (req, res) => {

try {
  res.cookie("jwt","",{
    maxAge:0
  })
  res.status(200).json("loged out succesfully")
} catch (error) {
  res.status(500).json("internal server error ...")
}

};

module.exports = { signup, login, logout };
