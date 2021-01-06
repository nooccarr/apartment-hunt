const express = require('express');
const axios = require('axios');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes/route');
const app = express();
const PORT = 3000;

// const {
//   saveMsg,
//   fetchChatsByUser,
//   fetchChatsByAgent,
//   conAgent,
//   // fetchMsgById,
//   fetchMsgByChatRoom,
// } = require('../src/components/ChatBox/backend/chatboxDB.js');
const jwt = require('jsonwebtoken');
var JwTStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var opts = {};
opts.jwtFromRequest = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};
opts.secretOrKey = 'secret';
passport.use(
  new JwTStrategy(opts, function (jwt_payload, done) {
    console.log('JWT BASED  VALIDATION GETTING CALLED');
    console.log('JWT', jwt_payload);
    //if ((jwt_payload.data)) { //need to call findone or whatever
    if (jwt_payload.payload) {
      return done(null, jwt_payload.payload);
    } else {
      // user account doesnt exists in the data
      return done(null, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  //console.log('user in serailize', user)
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//.initialize() must be used for express apps
app.use(passport.initialize());
//.session() for persistent login sessions
//can probably disable
app.use(passport.session());

// Serve static assets from 'dist' folder
app.use('(/apartment)?', express.static(path.join(__dirname, '../dist')));
app.use('(/uploadlisting)?', express.static(path.join(__dirname, '../dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.get('/restaurants', function (req, res) {
  var query = req.url.slice(14);
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` + query
    )
    .then((response) => {
      res.status(200).send(response.data.results);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.get('/schools', function (req, res) {
  var query = req.url.slice(10);
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` + query
    )
    .then((response) => {
      res.status(200).send(response.data.results);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/', router);

// FIXME:ChatBox
app.use('(/aportal)?', express.static(path.join(__dirname, '../dist')));
////////////////

// FIXME:ChatBox
// app.use('(/chatbox)?', express.static(path.join(__dirname, '../dist')));
////////////////

////////////////ChatBox Logic/////////////////////////////////
// app.post('/msg', function (req, res) {
//   // console.log('msg', req.body);
//   saveMsg(req.body)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//     });
// });

// app.get('/msg/client', function (req, res) {
//   // console.log('hit', req.query);
//   fetchChatsByUser(req.query)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//       console.log(err);
//     });
// });

// app.get('/msg/agent', function (req, res) {
//   fetchChatsByAgent(req.query)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//       console.log(err);
//     });
// });

// app.post('/chatRoom', function (req, res) {
//   // console.log('chatreq', req.body);
//   conAgent(req.body)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//     });
// });

// app.get('/chatRoom', function (req, res) {
//   return fetchMsgByChatRoom(req.query)
//     .then((chatterRoom) => {
//       console.log('chatterRoom: ', chatterRoom);
//       res.json(chatterRoom);
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//     });
// });

////////////////ChatBox Logic/////////////////////////////////
