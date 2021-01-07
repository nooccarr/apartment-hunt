const express = require('express');
const controller = require('../controllers/controller');
const {
  downloadRoute,
  uploadRoute,
  videoRoute,
  uploadPhotosRoute,
} = require('./fileUploadRoutes.js');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/login', controller.login);
router.post('/login-admin', controller.loginAdmin);
router.post('/signup', controller.signup);
router.delete('/signout', controller.signout);
router.get('/search', controller.search);
router.get('/apt', controller.apt);
router.get('/applicants', controller.applicants);
router.post('/listing', controller.listing);
//////ChatBox Below////////
router.post('/msg', controller.saveMsg);
router.get('/msg/client', controller.fetchChatsByUser);
router.get('/msg/agent', controller.fetchChatsByAgent);
router.post('/chatRoom', controller.conAgent);
router.get('/chatRoom', controller.fetchMsgByChatRoom);
//////ChatBox After////////
// File Upload Routes
router.get('/user', controller.userController);
router.get('/download', downloadRoute);
router.post('/upload', upload.any(), uploadRoute);
router.post('/video', upload.any(), videoRoute);
router.post('/addVideo', controller.addVideo);
router.post('/photos', upload.any(), uploadPhotosRoute);

//matt's test
//8router.get('/login', controller.loginGet);
//end test

module.exports = {
  router,
};
