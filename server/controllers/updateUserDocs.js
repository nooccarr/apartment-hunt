const User = require('../models/userModel.js');

const updateUserDocs = (username, fileNameArray) => {
  return User.findOneAndUpdate({username: username},
    {$addToSet: { documents: fileNameArray } }).exec()
}

exports.updateUserDocs = updateUserDocs;