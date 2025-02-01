const express = require("express");
const Conversation = require("../models/conversationmodel");
const User = require("../models/usermodel");
const Message = require("../models/messagemodel");

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    let newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //!...........socket io code here..........

    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json("internal server error");
    console.log(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const userToChatId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [(senderId, userToChatId)] },
    }).populate("messages")

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(400).json("internal server error");
  }
};

module.exports = { sendMessage, getMessage };
