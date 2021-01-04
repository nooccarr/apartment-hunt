const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes/route');
const app = express();
const PORT = 3000;
const axios = require('axios');
const multer = require('multer');
const upload = multer();
const {uploadFile, getFile, decryptMessage} = require('../util/upload-file.js');


// Serve static assets from 'dist' folder
app.use('(/apartment)?', express.static(path.join(__dirname, '../dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.post('/upload', upload.any(), (req, res) => {
  // How to pass files to endpoint?
  console.log(req.files);
  var promises = [];
  req.files.forEach((file) => {
    promises.push(uploadFile(file));
  })
  Promise.all(promises)
  .then((result) => {
    //console.log(result);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log("Error in post route! Errror: ", err);
    res.sendStatus(500);
  })
})

app.get('/download', (req, res) => {
  getFile("Encrypted PDF File.pdf")
  .then((data) => {
    console.log('Encrypted message return: ', data['Body'])
    //console.log('Decrypt Message Return: ', decryptMessage(data['Body']));
    //data['Body'] = decryptMessage(data['Body']);
    res.send(data).status(200);
  })
  .catch((err) => {
    console.log("Error in /download path! Error: ", err);
    res.sendStatus(500);
  })
})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/', router);
