/* eslint-disable no-console */
const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config');
const sequelize = require('./db/sequelize');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());


async function start() {
  try {
    await sequelize.sync({ force: false });
    app.listen(config.PORT || 3000, () => {
      console.log(`Server run localhost:${config.PORT || 3000}`);
    });
  } catch (e) {

    console.log(e);
  }
}

start();
