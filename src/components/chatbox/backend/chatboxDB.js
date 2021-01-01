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
  chatId: { type: String, unique: true },
  address: String,
  userName: String,
  agentName: String,
  userId: String,
  agentId: String,
  messages: [
    {
      message: String,
      sender: String,
      createdAt: String,
    },
  ],
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// save or create messages that sent from user
const saveMsg = (message) => {
  ChatMessage.find({ chatId: message.chatId }, function (err, data) {
    if (data) {
      return ChatMessage.findAndUpdate(message.chatId, {
        $push: {
          messages: {
            message: message.body,
            sender: message.sender,
            createdAt: JSON.stringify(new Date()),
          },
        },
      });
    } else {
      const params = {
        chatId: message.chatId,
        address: message.address,
        userName: message.userName,
        agentName: message.agentName,
        userId: message.userId,
        agentId: message.agentId,
        message: [
          {
            message: message.body,
            sender: message.sender,
            createdAt: JSON.stringify(new Date()),
          },
        ],
      };
      return ChatMessage.create(params);
    }
  });
};

// fetch message history by client/agent name
const fetchChatsByUser = (query) => {
  return ChatMessage.find({ userId: query.userId }).exec();
};

const fetchChatsByAgent = (query) => {
  return ChatMessage.find({ agentId: query.agentId }).exec();
};

// fetch message by roomname/id...
const fetchMsgById = (query) => {
  return ChatMessage.findById(query.chatId, 'messages').exec();
};

module.exports = ChatMessage;
