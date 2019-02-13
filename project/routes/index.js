const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/geo', (req, res, next) => {
  res.render('geo');
});

module.exports = router;
