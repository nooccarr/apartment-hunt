const express = require('express');
const controller = require('../controllers/controller');
const { downloadRoute, uploadRoute } = require('./fileUploadRoutes.js');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/search', controller.search);
router.post('/listing', controller.listing);

// File Upload Routes
router.get('/download', downloadRoute);
router.post('/upload', upload.any(), uploadRoute);

module.exports = {
  router,
};
