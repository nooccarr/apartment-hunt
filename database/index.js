const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/apartmentHunt', {promiseLibrary: global.Promise});

// NEW DATABASE SERVER IP: 3.14.136.176
const { user, password } = require('./dbconfig.js');
const db = mongoose.connect(
  `mongodb://${user}:${password}@3.14.136.176:27017/apartmentHunt?authSource=admin`,
  { promiseLibrary: global.Promise }
);

module.exports = db;
