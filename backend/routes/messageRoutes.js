const express = require("express");
const protectedRoute = require("../middleware/protectRoute");
const {sendMessage, getMessage} = require("../controllers/messageController");

const router = express.Router();

router.post("/send/:id", protectedRoute,sendMessage);
router.get("/:id", protectedRoute,getMessage);

module.exports = router
