const express = require('express');
const controller = require('../controllers/controller');
const { downloadRoute, uploadRoute, videoRoute } = require('./fileUploadRoutes.js');
const multer = require('multer');
const upload = multer();

const router = express.Router();

//router.get('/auth/google', controller.authGoogle)
//router.get('/auth/google/redirect', controller.authGoogleRedirect)
router.post('/login', controller.login);
router.post('/login-admin', controller.loginAdmin);
router.post('/signup', controller.signup);
router.delete('/signout', controller.signout);
router.get('/search', controller.search);
router.get('/apt', controller.apt);
router.get('/applicants', controller.applicants);
router.post('/listing', controller.listing);
router.get('/user', controller.userController)
// File Upload Routes
router.get('/download', downloadRoute);
router.post('/upload', upload.any(), uploadRoute);
router.post('/video', upload.any(), videoRoute);
router.post('/addVideo', controller.addVideo);

module.exports = {
  router,
};
