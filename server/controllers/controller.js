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
let long = -73.94443814752641;
let lat = 40.69396233779667;
// if (req.params.city !== undefined) {}
// Apts.find({'state': 'NY'})
//.then((apts) => {})
Apts.find().where('position').near({ center: [long, lat], maxDistance:  0.00008938082823178741, spherical: true })
  .then((apts) => {
    let filteredApts = [];
    for (let i = 0; i < apts.length; i++){
      if (apts[i].beds > 2) {
        filteredApts.push(apts[i]);
      }
    }
    res.status(200).json(filteredApts);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
};

const listing = (req, res) => {

  let aptObj = {};
  aptObj.address = req.body.address;
  aptObj.listingName = req.body.address;
  aptObj.city = "New York";
  aptObj.state = "NY";
  aptObj.zipCode = req.body.zipCode;
  aptObj.country = "US";
  aptObj.description = req.body.description;
  aptObj.pets = {dogs: req.body.dogs, cats: req.body.cats};
  aptObj.agent = req.body.agent;
  aptObj.sqft = req.body.sqft;
  aptObj.beds = req.body.beds;
  aptObj.baths = req.body.baths;
  aptObj.price = req.body.price;
  aptObj.neighborhoods = req.body.neighborhoods;
  aptObj.position = {type: "Point", coordinates: [req.body.longitude, req.body.latitude]}
  aptObj.pics = req.body.pics;
  Apts.create(aptObj)
  .then(() => {
    res.sendStatus(200);
    console.log('meow');
  })
  .catch((err) => {
    res.sendStatus(500);
  })
};

module.exports = {
  login,
  signup,
  search,
  listing
};
