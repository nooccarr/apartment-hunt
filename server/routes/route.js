const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.post('/login', controller.login);
router.post('/login-admin', controller.loginAdmin);
router.post('/signup', controller.signup);
router.get('/search', controller.search);

//matt's test
//8router.get('/login', controller.loginGet);
//end test

module.exports = {
  router,
};
