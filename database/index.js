const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/apartmentHunt', {promiseLibrary: global.Promise});

module.exports = db;