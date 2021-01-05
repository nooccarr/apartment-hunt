const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const Apts = require('../../database/Apartments.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;

//*****************USER-SIGN-IN********************/
const login = (req, res) => {
  //console.log(req.body);
  //res.send('ok');
  //res.redirect('http://localhost:3000/'); might not work w react router?
  //res.redirect('http://localhost:3000/');
  //bcrypt creds
  //console.log(req.body);

  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(function (user) {
    if (!user) {
      res.redirect('/');
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result === true) {
          console.log('successful login');

          let user = {
            email: req.body.email, //or user.email
            provider: 'standard login',
          };

          let token = jwt.sign(
            {
              payload: user,
            },
            'secret',
            { expiresIn: '2m' }
          ); //increase after testing

          res.cookie('jwt', token);
          console.log('jwt token', token);
          res.redirect('/');
        } else {
          res.send('Incorrect password');
          res.redirect('/');
        }
      });
    }
  });
};

//*****************ADMIN-LOGIN********************/
const loginAdmin = (req, res) => {
  // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
  //   Admin.findOne({
  //     email: req.body.email,
  //     password: hash,
  //   }).then(function (data) {
  //     if (data) {
  //       console.log('sign in admin');
  //       // res.redirect('/apartments');
  //     }
  //   });
  // });
  res.sendStatus(200);
};

//*****************SIGN-UP********************/
const signup = (req, res) => {
  // bcrypt creds
  // console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    }).then(function (data) {
      if (data) {
        console.log('sign up test');
        // res.redirect('/apartments');
      }
    });
  });
  res.sendStatus(200);
};

//*****************SEARCH********************/
// const search = (req, res) => {
//   console.log(req.params);
//   let long = -73.92826824472331;
//   let lat = 40.70237509797474;
//   Apts.find()
//     .where('position')
//     .near({
//       center: [long, lat],
//       maxDistance: 0.00004765343822311093,
//       spherical: true,
//     })
//     .then((apts) => {
//       res.status(200).json(apts);
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//     });
// };

const applicants = (req, res) => {
  Apts.find()
    .where('agent')
    .equals(req.query.agent)
    .where('applicants')
    .exists(true)
    .then((apts) => {
      res.status(200).json(apts);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const apt = (req, res) => {
  let id = req.query.id;
  Apts.findById(id)
    .then((apartment) => {
      res.status(200).json(apartment);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const search = (req, res) => {
  //0.00008938082823178741
  //
  console.log('QUERY', req.query);
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
  Apts.find()
    .where('position')
    .near({ center: [long, lat], maxDistance: maxD, spherical: true })
    .then((apts) => {
      let filteredApts = [];
      for (let i = 0; i < apts.length; i++) {
        if (apts[i].beds > 2) {
          filteredApts.push(apts[i]);
        }
      }
      res.status(200).json(filteredApts);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const listing = (req, res) => {
  console.log(req.body);
  let aptObj = {};
  aptObj.address = req.body.address;
  aptObj.listingName = req.body.address;
  aptObj.city = 'New York';
  aptObj.state = 'NY';
  aptObj.zipCode = req.body.zipCode;
  aptObj.country = 'US';
  aptObj.description = req.body.description;
  aptObj.pets = { dogs: req.body.pets.dogs, cats: req.body.pets.cats };
  aptObj.agent = req.body.agent;
  aptObj.sqft = req.body.sqft;
  aptObj.beds = req.body.beds;
  aptObj.baths = req.body.baths;
  aptObj.price = req.body.price;
  aptObj.neighborhoods = req.body.neighborhoods;
  aptObj.position = {
    type: 'Point',
    coordinates: [
      req.body.position.coordinates[0],
      req.body.position.coordinates[1],
    ],
  };
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
    });
};

module.exports = {
  login,
  signup,
  search,
  loginAdmin,
  listing,
  apt,
  applicants,
};
