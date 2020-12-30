const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/search', controller.search);

module.exports = {
  router,
};
