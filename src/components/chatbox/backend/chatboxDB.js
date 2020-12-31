const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/ApartmentHunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

const chatMessageSchema = new mongoose.Schema({
  senderId: String,
  messageBody: String,
  agentId: String,
  createdAt: String,
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// save messages that sent from user
const saveMsg = (message) => {
  const params = {
    senderId: message.senderId,
    messageBody: message.body,
    agentId: message.agentId,
    createdAt: new Date(),
  };
  return ChatMessage.create(params);
};

// fetch message history
const fetchMsg = (query) => {
  return ChatMessage.find({ senderId: query.senderId, agentId: query.agentId })
    .sort('-createdAt')
    .exec();
};

module.exports = ChatMessage;
