/* eslint-disable no-console */
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(cookieParser());



async function start() {
  try {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server run localhost:${process.env.PORT || 3000}`);
    });
  } catch (e) {

    console.log(e);
  }
}

start();
