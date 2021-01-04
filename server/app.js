const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static assets from 'dist' folder
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/restaurants', function (req, res) {
  var query = req.url.slice(14)
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?` + query)
    .then((response) => {
      res.status(200).send(response.data.results)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

app.get('/schools', function (req, res) {
  var query = req.url.slice(10)
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?` + query)
    .then((response) => {
      res.status(200).send(response.data.results)
    })
    .catch((err) => {
      console.log(err.message)
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})