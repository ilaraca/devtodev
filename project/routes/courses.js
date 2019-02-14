const express = require('express');

const User = require('../models/User.js');

const router = express.Router();

router.get('/courses', (req, res) => {
  const userId = req.query.course;
  User.find({ course: userId })
    .then((users) => {
      console.log('truta', users);
      res.render('courses/course', { users });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
