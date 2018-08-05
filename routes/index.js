var express = require('express')
var router = express.Router()

router.use('/hotel', require('./hotel'))
router.use('/room', require('./room'))
router.use('/user', require('./user'))
router.use('/booking', require('./booking'))

module.exports = router