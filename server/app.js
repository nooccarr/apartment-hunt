const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes/route');
const app = express();
const PORT = 3000;

// Serve static assets from 'dist' folder
app.use('(/apartment)?', express.static(path.join(__dirname, '../dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/', router);
