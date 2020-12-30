const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const PORT = 3000;
const Apts = require('../database/Apartments.js')

// Serve static assets from 'dist' folder
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/aptsearch', (req, res) => {
  Apts.find({}).sort('-price')
  .then((apts) => {
    res.status(200).json(apts);
  })
  .catch((err) => {
    res.sendStatus(500);
  })
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})