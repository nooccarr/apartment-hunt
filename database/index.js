const mongoose = require('mongoose');

const { user, password } = require('./dbconfig.js');
const db = mongoose.connect(
  `mongodb://${user}:${password}@3.133.116.139:27017/apartmentHunt?authSource=admin`,
  { promiseLibrary: global.Promise }
);

module.exports = db;
// const db = mongoose.connect('mongodb://localhost/apartmentHunt', {promiseLibrary: global.Promise});

// module.exports = db;
