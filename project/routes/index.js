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

router.get('/geo', (req, res, next) => {
  res.render('geo');
});

router.post('/geo', (req, res, next) => {

  let { street, number, city } = req.body;
  console.log(req.body.current)
  street = street.split(' ').join('');
  city = city.split(' ').join('');
  loc.getLatLong(street, city, number)
    .then((getLocation) => {
      console.log('a', getLocation.data.results[0].geometry.location);
      res.redirect('/');
    })
    .catch((err, getLocation) => {
      console.log(err, getLocation);
    });
});

module.exports = router;
