/* eslint-disable no-console */
const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
const sequelize = require('./db/sequelize');
const passportStrategy = require('./middleware/passport.strategy');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
passport.use('admin', passportStrategy.admin);
passport.use('adminOrModer', passportStrategy.adminOrModer);
passport.use('user', passportStrategy.user);

app.use('/api/sites', require('./routers/tourist_sites.router'));
app.use('/api/category', require('./routers/category.router'))
app.use('/api/auth', require('./routers/auth.router'))
app.use('/api/comments', require('./routers/comments.router'))
app.use('/api/users', require('./routers/users.router'))
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
