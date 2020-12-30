const User = require('../models/userModel');

const login = (req, res) => {
  // bcrypt creds
  console.log(req.body);
  res.sendStatus(200);
};

const signup = (req, res) => {
  // bcrypt creds
  console.log(req.body);
  res.sendStatus(200);
};

module.exports = {
  login,
  signup,
};
