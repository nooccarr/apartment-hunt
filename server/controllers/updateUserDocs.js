const User = require('../models/userModel.js');

const updateUserDocs = (user_id, fileNameArray) => {
  return User.findOneAndUpdate({user_id: user_id},
    {$addToSet: { documents: fileNameArray } }).exec()
}

exports.updateUserDocs = updateUserDocs;