const mongoose = require('mongoose');
const {user, password} = require('./dbconfig');
const db = mongoose.connect(`mongodb://${user}:${password}@3.133.116.139:27017/apartmentHunt?authSource=admin`, {promiseLibrary: global.Promise});

module.exports = db;