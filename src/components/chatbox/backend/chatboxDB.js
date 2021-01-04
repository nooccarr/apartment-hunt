const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// if (process.env.MONGODB_URI) {
//   mongoose.connect(process.env.MONGODB_URI);
// } else {
mongoose.connect('mongodb://localhost:27017/ApartmentHunt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// }

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
const conAgent = (message) => {
  return ChatMessage.findOne(
    { address: message.address, userName: message.userName },
    function (err, data) {
      if (data) {
        return;
      } else {
        message.chatId = uuidv4();
        return ChatMessage.create(message);
      }
    }
  );
};

const saveMsg = (message) => {
  return ChatMessage.findOne({ chatId: message.chatId }, function (err, data) {
    console.log('data', data);
    console.log('body_sender', message.body, message.sender);
    const newMessage = {
      message: message.body,
      sender: message.sender,
      createdAt: JSON.stringify(new Date()),
    };
    const msgCol = data.messages;
    msgCol.push(newMessage);
    console.log('data', data);
    return data.save();
  });
};

// fetch message history by client/agent name
const fetchChatsByUser = (query) => {
  console.log('query: ', query);
  return ChatMessage.find({ userName: query.userName }).exec();
};

const fetchChatsByAgent = (query) => {
  return ChatMessage.find({ agentName: query.userName }).exec();
};

// fetch message by roomname/id...
const fetchMsgById = (query) => {
  return ChatMessage.findById(query.chatId, 'messages').exec();
};

const fetchMsgByChatRoom = (query) => {
  console.log('query: ', query);
  return ChatMessage.find({
    address: query.address,
    userName: query.userName,
  }).exec();
};

module.exports.saveMsg = saveMsg;
module.exports.fetchChatsByUser = fetchChatsByUser;
module.exports.fetchChatsByAgent = fetchChatsByAgent;
module.exports.fetchMsgById = fetchMsgById;
module.exports.conAgent = conAgent;
module.exports.fetchMsgByChatRoom = fetchMsgByChatRoom;
