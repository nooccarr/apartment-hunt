const jwt = require('jsonwebtoken');

//generate a new token w user obj
let newJWT = (user) => {
  let token = jwt.sign(
    {
      payload: user,
    },
    'secret',
    { expiresIn: '1h' }
  );

  return token;
};

module.exports = {
  newJWT,
};
