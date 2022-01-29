const express = require('express')
const {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurant')

const Restaurant = require('../models/Restaurant')

const router = express.Router({ mergeParams: true })

const {protect, authorize} = require('../middleware/auth')

router
  .route('/')
  .post(protect, authorize('creater', 'admin'), createRestaurant)

router
  .route('/:id')
  .get(getRestaurant)
  .put(protect, authorize('creater', 'admin'), updateRestaurant)
  .delete(protect, authorize('creater', 'admin'), deleteRestaurant)

module.exports = router