const express = require('express');
const protectedRoute = require('../middleware/protectRoute');
const getUsersForSideBar = require('../controllers/userController');

const router=express.Router()


router.get("/",protectedRoute,getUsersForSideBar)

module.exports=router