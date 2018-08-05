var express = require('express');
var router = express.Router();
var hotel = require("../controllers/hotel.js");

router.get('/list', hotel.list);

// Get single product by id
router.get('/show/:id', hotel.show);

// Save product
router.post('/create', hotel.create);

// Edit Product Save
router.post('/update/:id', hotel.update);

// Delete Product
router.post('/delete/:id', hotel.delete);

module.exports = router;