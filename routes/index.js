const express = require('express');
const axios = require('axios');
const router = express.Router();
const controller = require('../controllers/main.js');
router.get('/', (req, res) => {
  res.render('index', { title: 'Weather Reminder' });
});

router.get('/w', controller.getWeather);

router.get('/g', controller.getGoogleLocation);

module.exports = router;
