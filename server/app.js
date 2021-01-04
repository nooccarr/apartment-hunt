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
  fetchMsgById,
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
app.use('(/chatbox)?', express.static(path.join(__dirname, '../dist')));
////////////////

app.post('/msg', function (req, res) {
  console.log(req.body);

  saveMsg(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.get('/msg/user', function (req, res) {
  console.log('hit', req.query);
  fetchChatsByUser(req.query)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});
