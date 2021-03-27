'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());

const start = (port) => {
  if (!port) {
    throw new Error('missing port');
  }

  app.listen(port, () => {
    console.log(`Server up on port ${port}`);
  })
}

module.exports = {
  server: app,
  start: start,
  PORT: PORT
}
