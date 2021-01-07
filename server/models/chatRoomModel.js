const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  aptId: String,
  chatId: { type: String, unique: true },
  address: String,
  userName: String,
  agentName: String,
  lastUpdate: Date,
  messages: [
    {
      message: String,
      sender: String,
      createdAt: Date,
    },
  ],
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
