const express = require('express')
const {
  getRestaurants
 } = require('../controllers/restaurant')

const router = express.Router({ mergeParams: true })

router
.route('/')
.get(getRestaurants)


module.exports = router