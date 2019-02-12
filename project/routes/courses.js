const express = require('express');
const Course = require('../models/Course.js');

const router = express.Router();

/* GET Course page */
router.get('/courses', (req, res) => {
  Course.find()
    .then((courses) => {
      res.render('courses/course', { courses });
    })
    .catch((error) => {
      console.log(error);
    });
});
//

module.exports = router;
