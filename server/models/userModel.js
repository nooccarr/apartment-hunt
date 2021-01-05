const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({
  id: Number,
  date: { type: Date, default: Date.now },
  username: String,
  email: { type: String, index: { unique: true } },
  password: String,
  documents: Array,
  name: String
});

let User = mongoose.model('user', user);
user.index({ id: 1 }, { unique: true }, { timestamps: true });
module.exports = User;
