var express = require('express');
var router = express.Router();
var booking = require("../controllers/booking.js");

router.get('/list', booking.list);

// Get single booking by id
router.get('/show/:id', booking.show);

// Save booking
router.post('/create', booking.create);

router.post('/fetchAllAvailableRooms', booking.fetchAllAvailableRooms);


module.exports = router;