/* eslint-disable no-unused-vars */
require('dotenv').config();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/devtodev-project', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'DevToDev - Generated with IronHackers';

app.use(session({
  secret: 'dev-to',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUserInfo = req.session.currentUser;
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }
  next();
});


const index = require('./routes/index');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const user = require('./routes/usersettings');

app.use('/', index);
app.use('/', authRoutes);
app.use('/', courseRoutes);
app.use('/user', user);

module.exports = app;
