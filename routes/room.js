var express = require('express');
var router = express.Router();
var room = require("../controllers/room.js");

router.get('/list/:hotelId', room.list);

// Get single product by id
router.get('/show/:id', room.show);

// Save product
router.post('/create', room.create);

// Edit Product Save
router.post('/update/:id', room.update);

// Delete Product
router.post('/delete/:id', room.delete);

module.exports = router