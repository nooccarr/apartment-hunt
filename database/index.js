const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/apartmentHunt?authSource=admin', { promiseLibrary: global.Promise, useNewUrlParser: true, useUnifiedTopology: true });

require('dotenv').config();

// NEW DATABASE SERVER IP: 3.14.136.176
// const { user, password } = require('./dbconfig.js');
const db = mongoose.connect(
  // `mongodb://${user}:${password}@3.14.136.176:27017/apartmentHunt?authSource=admin`,
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@3.14.136.176:27017/apartmentHunt?authSource=admin`,
  { promiseLibrary: global.Promise, useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = db;
