const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes/route');
const app = express();
const PORT = 3000;
const Apts = require('../database/Apartments.js')

// Serve static assets from 'dist' folder
app.use(express.static(path.join(__dirname, '../dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

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
  console.log(`Listening on port ${PORT}`);
});

app.use('/', router);
