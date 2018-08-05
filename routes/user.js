var express = require('express');
var router = express.Router();
var user = require("../controllers/user.js");

router.get('/list', user.list);

// Get single product by id
router.get('/show/:id', user.show);

// Create product
router.post('/create', user.create);

// Edit Product Save
router.post('/update/:id', user.update);

// Delete Product
router.post('/delete/:id', user.delete);

module.exports = router;