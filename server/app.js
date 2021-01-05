const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes/route');
const app = express();
const PORT = 3000;

const {
  saveMsg,
  fetchChatsByUser,
  fetchChatsByAgent,
  conAgent,
  fetchMsgById,
  fetchMsgByChatRoom,
} = require('../src/components/ChatBox/backend/chatboxDB.js');

// Serve static assets from 'dist' folder
app.use('(/apartment)?', express.static(path.join(__dirname, '../dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/', router);

// FIXME:ChatBox
app.use('(/aportal)?', express.static(path.join(__dirname, '../dist')));
////////////////

// FIXME:ChatBox
app.use('(/chatbox)?', express.static(path.join(__dirname, '../dist')));
////////////////

////////////////ChatBox Logic/////////////////////////////////
app.post('/msg', function (req, res) {
  // console.log('msg', req.body);

  saveMsg(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.get('/msg/client', function (req, res) {
  // console.log('hit', req.query);
  fetchChatsByUser(req.query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});

app.get('/msg/agent', function (req, res) {
  fetchChatsByAgent(req.query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});

app.post('/chatRoom', function (req, res) {
  // console.log('chatreq', req.body);
  conAgent(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.get('/chatRoom', function (req, res) {
  return fetchMsgByChatRoom(req.query)
    .then((chatterRoom) => {
      console.log('chatterRoom: ', chatterRoom);
      res.json(chatterRoom);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

////////////////ChatBox Logic/////////////////////////////////
