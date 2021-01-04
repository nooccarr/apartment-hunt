const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://3.15.44.229/apartmentHunt', {promiseLibrary: global.Promise});

module.exports = db;