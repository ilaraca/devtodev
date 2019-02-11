const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');

const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup', {
    errorMessage: ''
  });
});

module.exports = router;