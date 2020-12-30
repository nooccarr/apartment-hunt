const User = require('../models/userModel');
const Apts = require('../../database/Apartments.js');

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

const search = (req, res) => {
console.log(req.params);
let long = -73.92826824472331;
let lat = 40.70237509797474;
Apts.find().where('position').near({ center: [long, lat], maxDistance:  0.00004765343822311093, spherical: true })
  .then((apts) => {
    res.status(200).json(apts);
  })
  .catch((err) => {
    res.sendStatus(500);
  })
}
module.exports = {
  login,
  signup,
  search
};
