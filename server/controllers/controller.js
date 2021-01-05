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

const applicants = (req, res) => {
  Apts.find().where('agent').equals(req.query.agent).where('applicants').exists(true)
  .then((apts) => {
    res.status(200).json(apts);
  })
  .catch((err) => {
    res.sendStatus(500);
  })
};

const apt = (req, res) => {
  let id = req.query.id;
  Apts.findById(id)
  .then((apartment) => {
    res.status(200).json(apartment);
  })
  .catch((err) => {
    res.sendStatus(500);
  })
};

const search = (req, res) => {
//0.00008938082823178741
//
console.log("QUERY",req.query);
let long = parseFloat(req.query.long);
let lat = parseFloat(req.query.lat);
let ascOrDsc = req.query.order ? req.query.order : -1;
let maxD = parseFloat(req.query.distance) / 1609.344;
/*if (req.query.priceMin || req.query.priceMax) {
  Apts.find({price: {$gte: req.query.priceMin, $lte: req.query.priceMax}}).sort({price: ascOrDsc})
  .then((apts) => {
    res.status(200).json(apts)
  })
  .catch((err) => {
    res.sendStatus(500);
  });
}
if (req.query.burrough) {
  Apts.find({neighborhoods:})
  .then((apts) => {
    res.status(200).json(apts)
  })
  .catch((err) => {
    res.sendStatus(500);
  });
}*/
Apts.find().where('position').near({ center: [long, lat], maxDistance: maxD, spherical: true })
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

  console.log(req.body);
  let aptObj = {};
  aptObj.address = req.body.address;
  aptObj.listingName = req.body.address;
  aptObj.city = "New York";
  aptObj.state = "NY";
  aptObj.zipCode = req.body.zipCode;
  aptObj.country = "US";
  aptObj.description = req.body.description;
  aptObj.pets = {dogs: req.body.pets.dogs, cats: req.body.pets.cats};
  aptObj.agent = req.body.agent;
  aptObj.sqft = req.body.sqft;
  aptObj.beds = req.body.beds;
  aptObj.baths = req.body.baths;
  aptObj.price = req.body.price;
  aptObj.neighborhoods = req.body.neighborhoods;
  aptObj.position = {type: "Point", coordinates: [req.body.position.coordinates[0], req.body.position.coordinates[1]]}
  aptObj.pics = req.body.pics;
  aptObj.videos = req.body.videos;
  console.log(aptObj);
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
  listing,
  apt,
  applicants
};
