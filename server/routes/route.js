const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.post('/login', controller.login);
router.post('/login-admin', controller.loginAdmin);
router.post('/signup', controller.signup);
router.get('/search', controller.search);
router.get('/apt', controller.apt);
router.get('/applicants', controller.applicants);
router.post('/listing', controller.listing);
router.post('/video', controller.addVideo);

//matt's test
//8router.get('/login', controller.loginGet);
//end test

module.exports = {
  router,
};
