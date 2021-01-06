const mongoose = require('mongoose');
<<<<<<< HEAD
// const db = mongoose.connect('mongodb://localhost/apartmentHunt', {promiseLibrary: global.Promise});
=======
>>>>>>> a0f039e681f15898b30249678a97c5c3b1f88bdf

const { user, password } = require('./dbconfig.js');
const db = mongoose.connect(
  `mongodb://${user}:${password}@3.133.116.139:27017/apartmentHunt?authSource=admin`,
  { promiseLibrary: global.Promise }
);

module.exports = db;
<<<<<<< HEAD
=======
// const db = mongoose.connect('mongodb://localhost/apartmentHunt', {promiseLibrary: global.Promise});

// module.exports = db;
>>>>>>> a0f039e681f15898b30249678a97c5c3b1f88bdf
