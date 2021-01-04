
const { uploadFile, getFile, decryptMessage} = require('../../util/s3HelperFunctions.js');
const { updateUserDocs } = require('../controllers/updateUserDocs.js');
const { updateApartmentApplicant } = require('../controllers/updateApartmentApplicant.js');

const downloadRoute = (req, res) => {
  getFile("Encrypted PDF File.pdf")
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
  //promises.push(updateUserDocs(1, fileNames));
  //promises.push(updateApartmentApplicant(1, 2));
  Promise.all(promises)
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log("Error in post route! Errror: ", err);
    res.sendStatus(500);
  })
}

exports.downloadRoute = downloadRoute;
exports.uploadRoute = uploadRoute;