const express = require('express');

const router = express.Router();

const Course = require('../models/Course');

/* GET home page */

router.get('/', (req, res) => {
  Course.find({}, { _id: 1, name: 1 })
    .then((courses) => {
      res.render('index', { courses });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
