const jwt = require('jsonwebtoken');

//generate a new token w user obj
let newJWT = (user) => {
  let token = jwt.sign(
    {
      payload: user,
    },
    'secret',
    { expiresIn: '3m' }
  );

  return token;
};

module.exports = {
  newJWT,
};
