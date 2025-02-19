const express = require("express");
const Conversation = require("../models/conversationmodel");
const User = require("../models/usermodel");
const Message = require("../models/messagemodel");
const { io, getReceiverSocketId } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    // Check if a conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create a new message instance
    let newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Save the new message
    await newMessage.save();

    // Add the message's ID to the conversation's messages array after saving it
    conversation.messages.push(newMessage._id);

    // Save the updated conversation
    await conversation.save();

    // Get the receiver's socket ID and emit the new message
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Respond with the new message
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error"); // Changed 400 to 500 for internal server errors
  }
};

module.exports = { sendMessage };

const getMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const userToChatId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }, // ✅ Fixed query
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.json(conversation.messages || []); // ✅ Ensures messages is never undefined
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error"); // ✅ Changed 400 → 500 for server errors
  }
};

module.exports = { sendMessage, getMessage };
