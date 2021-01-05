const mongoose = require('mongoose');

const db = mongoose.connect(
  'mongodb://blueocean:kfCgkWe@3.133.116.139:27017/apartmentHunt?authSource=admin',
  { promiseLibrary: global.Promise }
);
//
module.exports = db;
