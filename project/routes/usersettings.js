const express = require('express');
const Location = require('../controllers/location');
const User = require('../models/User');
const Course = require('../models/Course');
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });

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
      User.find({ _id: user._id })
        .populate('course', 'name')
        .then((user) => {
          user = user[0];
          const userCourses = user.course.map(item => item.name);
          const coursesOut = courses.slice().filter(item => !userCourses.includes(item.name));
          res.render('users/settings', { coursesOut, user });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/settings', upload.single('photo'), (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { name, email } = req.body;
  const courses = req.body.course;
  const imgPath = `/uploads/${req.file.filename}`;
  if (typeof courses !== 'string') {
    courses.forEach((course) => {
      User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [], imgPath } })
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
    User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [], imgPath } })
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
