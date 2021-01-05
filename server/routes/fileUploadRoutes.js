
const { uploadFile, getFile, decryptMessage, uploadVideo} = require('../../util/s3HelperFunctions.js');
const { updateUserDocs } = require('../controllers/updateUserDocs.js');
const { updateApartmentApplicant } = require('../controllers/updateApartmentApplicant.js');

const downloadRoute = (req, res) => {
  console.log('Request object', req);
  console.log('Req file name: ', req.query.filename);
  getFile(req.query.filename)
  .then((data) => {
    data['Body'] = decryptMessage(data['Body']);
    res.send(data).status(200);
  })
  .catch((err) => {
    console.log("Error in /download path! Error: ", err);
    res.sendStatus(500);
  })
}

const uploadRoute = (req, res) => {
  //console.log('Files that are being posted', req.files);
  var promises = [];
  var fileNames = [];
  req.files.forEach((file) => {
    promises.push(uploadFile(file));
    fileNames.push(file.originalname);
  })
  promises.push(updateUserDocs("username", fileNames));
  promises.push(updateApartmentApplicant("5ff48f80f8d9ecaff9eb3545", "username"));
  Promise.all(promises)
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log("Error in post route! Errror: ", err);
    res.sendStatus(500);
  })
}

const videoRoute = (req, res) => {
  uploadVideo(req.files[0])
  .then((result) => {
    console.log(result);
    res.sendStatus(200)
  })
  .catch((err) => {
    console.log("Error in video upload route! Error: ", err);
    res.sendStatus(500);
  })
}

exports.downloadRoute = downloadRoute;
exports.uploadRoute = uploadRoute;
exports.videoRoute = videoRoute;