const express = require("express");
const User = require("../models/usermodel");

const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);

    res.status(400).json("internal server error");
  }
};

module.exports = getUsersForSideBar;
