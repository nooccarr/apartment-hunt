const mongoose = require('mongoose');
<<<<<<< HEAD
// const db = mongoose.connect('mongodb://localhost/apartmentHunt', {promiseLibrary: global.Promise});

// module.exports = db;
=======

const { user, password } = require('./dbconfig');
const db = mongoose.connect(
  `mongodb://${user}:${password}@3.133.116.139:27017/apartmentHunt?authSource=admin`,
  { promiseLibrary: global.Promise }
);

module.exports = db;
>>>>>>> b3bcbdad11894ffedbfb26b057ad15fbcafdf5cb
