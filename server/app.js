const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes/route');
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/', router);
