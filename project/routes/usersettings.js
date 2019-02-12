const express = require('express');
const Location = require('../controllers/location');
const User = require('../models/User');
const Course = require('../models/Course');

const router = express.Router();
const loc = new Location();

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');
});

router.get('/settings', (req, res, next) => {
  const user = req.session.currentUser;
  Course.find()
    .then((courses) => {
      res.render('users/settings', { courses, user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/settings', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { name, email } = req.body;
  const courses = req.body.course;
  User.findByIdAndUpdate({ _id: userId }, { $set: { name, email } })
    .then(() => {
      console.log(courses);
      courses.forEach((course) => {
        Course.findByIdAndUpdate({ _id: course }, { $push: { user: userId } })
          .then(() => {
            res.redirect('/');
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
});

module.exports = router;
