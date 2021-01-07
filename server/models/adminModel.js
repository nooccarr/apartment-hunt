const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let admin = new Schema({
  id: Number,
  date: { type: Date, default: Date.now },
  username: { type: String, index: { unique: true } },
  email: { type: String, index: { unique: true } },
  password: String,
});

let Admin = mongoose.model('admin', admin);
admin.index({ id: 1 }, { unique: true }, { timestamps: true });
module.exports = Admin;
