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
const search = (req, res) => {
  console.log(req.params);
  let long = -73.92826824472331;
  let lat = 40.70237509797474;
  Apts.find()
    .where('position')
    .near({
      center: [long, lat],
      maxDistance: 0.00004765343822311093,
      spherical: true,
    })
    .then((apts) => {
      res.status(200).json(apts);
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
};
