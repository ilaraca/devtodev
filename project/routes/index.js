/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const location = require('../controllers/location');
const loc = new location();

const axios = require('axios');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/geo', (req, res, next) => {
  res.render('geo');
});

router.post('/geo', (req, res, next) => {
  console.log('a')
  navigator.geolocation.getCurrentPosition((position) => {
    console.log( position.coords.longitude);
  });

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
