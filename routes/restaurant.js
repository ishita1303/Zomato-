const express = require('express')
const {
  getRestaurants,
  createRestaurant
} = require('../controllers/restaurant')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getRestaurants)
  .post(createRestaurant)


module.exports = router