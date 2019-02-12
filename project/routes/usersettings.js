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
      console.log(courses)
      User.find({ _id: user.id })
        .populate('Course')
        .then(() => { 
          res.render('users/settings', { courses, user });
        })
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/settings', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { name, email } = req.body;
  const courses = req.body.course;
  if (typeof courses !== 'string') {
    courses.forEach((course) => {
      User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [] } })
        .then(() => {
          User.findByIdAndUpdate({ _id: userId }, { $push: { course } })
            .then(() => {
              res.redirect('/');
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [] } })
      .then(() => {
        User.findByIdAndUpdate({ _id: userId }, { $push: { courses } })
          .then(() => {
            res.redirect('/');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
