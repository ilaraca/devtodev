const express = require('express');

const Course = require('../models/Course.js');

const User = require('../models/User.js');

const router = express.Router();

router.get('/courses', (req, res, next) => {
  const { course } = req.query;
  // const user = '';
  Course.find({ name: course })
    .populate({
      path: 'user',
      populate: { path: 'user' }
    })
    .then((course) => {
      console.log('-------', course);
      // res.render('courses/course', { courses });
    });
});

// router.get('/courses', (req, res, next) => {
//   const { course } = req.query
//     .then((courses) => {
//       Course.find({ name: course.name })
//       console.log('lalalalala', course)
//         .populate('course', 'name')
//         .then((user) => {
//           const userId = user[0];
//           console.log(userId);
//           console.log('iaaaaau', course);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
