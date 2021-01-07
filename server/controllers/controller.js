const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const ChatMessage = require('../models/chatRoomModel');
const Apts = require('../../database/Apartments.js');
const Utils = require('../utils/auth.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const { v4: uuidv4 } = require('uuid');

//*****************USER-SIGN-IN********************/
const login = (req, res) => {
  //console.log(req.body);
  //res.send('ok');
  //res.redirect('http://localhost:3000/'); might not work w react router?
  //res.redirect('http://localhost:3000/');
  //bcrypt creds
  console.log('incoming email', req.body.email);

  User.findOne({
    email: req.body.email,
  })
    .then(function (user) {
      if (!user) {
        console.log('is there no user? ', user);
        res.sendStatus(200);
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            console.log(result);
            if (result === true) {
              console.log(result);
              console.log('successful login');

              // let user = {
              //   email: req.body.email, //or user.email
              //   provider: 'standard login',
              // };
              let u = {
                username: user.username,
                email: user.email,
                role: 'user',
              };
              let token = Utils.newJWT(u);

              res.cookie('jwt', token);
              console.log('jwt token', token);
              res.send('verified');
              //res.redirect('/profile');
            } else {
              res.send('Incorrect password');
              //res.redirect('/');
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log('err on lookup', err);
    });
};

//*****************ADMIN-LOGIN********************/
const loginAdmin = (req, res) => {
  console.log('incoming email', req.body.email);

  Admin.findOne({
    email: req.body.email,
  })
    .then(function (user) {
      if (!user) {
        console.log('is there no user? ', user);
        res.sendStatus(200);
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            console.log(result);
            if (result === true) {
              console.log(result);
              console.log('successful login');

              // let user = {
              //   email: req.body.email, //or user.email
              //   provider: 'standard login',
              // };
              let u = {
                username: user.username,
                email: user.email,
                role: 'admin',
              };
              let token = Utils.newJWT(u);

              res.cookie('jwt', token);
              console.log('jwt token', token);
              res.send('verified');
              //res.redirect('/profile');
            } else {
              res.send('Incorrect password');
              //res.redirect('/');
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log('err on lookup', err);
    });
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

//*****************SIGN-OUT********************/
const signout = (req, res) => {
  res.clearCookie('jwt');
  res.send('cleared cookie');
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

/*****

Query for users by username

*****/

const userController = (req, res) => {
  User.findOne({ username: req.query.username })
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const addVideo = (req, res) => {
  Apts.findByIdAndUpdate(req.query.id, {
    $addToSet: { videos: req.query.videos },
  })
    .then(() => {
      res.sendStatus(201);
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
  console.log('QUERY', req.query);
  let long = parseFloat(req.query.long);
  let lat = parseFloat(req.query.lat);
  let ascOrDsc = req.query.order ? req.query.order : -1;
  let maxD = parseFloat(req.query.distance) / 1609.344;

  if (req.query.burrough) {
    Apts.find({ neighborhoods: { $in: [req.query.burrough] } })
      .then((apts) => {
        res.status(200).json(apts);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    Apts.find()
      .where('position')
      .near({ center: [long, lat], maxDistance: maxD, spherical: true })
      .then((apts) => {
        res.status(200).json(apts);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
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
      res.sendStatus(201);
      console.log('meow');
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

//////////////////////////////////CHATBOX Controller//////////////////////////////////////
const conAgent = (req, res) => {
  return ChatMessage.findOne(
    { address: req.body.address, userName: req.body.userName },
    function (err, data) {
      if (data) {
        return;
      } else {
        req.body.chatId = uuidv4();
        return ChatMessage.create(req.body);
      }
    }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const saveMsg = (req, res) => {
  return ChatMessage.findOne({ chatId: req.body.chatId }, function (err, data) {
    const newMessage = {
      message: req.body.body,
      sender: req.body.sender,
      createdAt: new Date(),
    };
    const msgCol = data.messages;
    msgCol.push(newMessage);
    data.lastUpdate = new Date();
    return data.save();
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};

const fetchChatsByUser = (req, res) => {
  return ChatMessage.find({ userName: req.query.userName })
    .sort('-lastUpdate')
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};

const fetchChatsByAgent = (req, res) => {
  return ChatMessage.find({ agentName: req.query.userName })
    .sort('-lastUpdate')
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};

const fetchMsgByChatRoom = (req, res) => {
  return ChatMessage.find({
    address: req.query.address,
    userName: req.query.userName,
  })
    .exec()
    .then((chatterRoom) => {
      console.log('chatterRoom: ', chatterRoom);
      res.json(chatterRoom);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};
//////////////////////////////////CHATBOX Controller//////////////////////////////////////

module.exports = {
  login,
  signup,
  search,
  loginAdmin,
  listing,
  apt,
  signout,
  applicants,
  saveMsg,
  fetchChatsByUser,
  fetchChatsByAgent,
  conAgent,
  fetchMsgByChatRoom,
  addVideo,
  userController,
};
