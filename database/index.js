const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://blueocean:kfCgkWe@3.133.116.139/apartmentHunt', {promiseLibrary: global.Promise});

module.exports = db;