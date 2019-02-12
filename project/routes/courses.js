const express = require('express');

const Course = require('../models/Course.js');

const User = require('../models/User.js');

const router = express.Router();

router.get('/courses', (req, res, next) => {
  const { course } = req.query;
  Course.find({ name: course })
    .then((courses) => {
      console.log('+++++++++', course);
      res.render('courses/course', { courses });
    });
});

// router.get('/settings', (req, res, next) => {
//   const user = req.session.currentUser;
//   Course.find()
//     .then((courses) => {
//       User.find({ _id: user._id })
//         .populate('course', 'name')
//         .then((userId) => {
//           res.render('users/settings', { courses, user });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
