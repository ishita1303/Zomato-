const express = require('express')
const {
  getMenu,
  getMenuItem,
  createMenu,
  updateMenu,
  deleteMenu,
  getRestaurantsWithMenuName
} = require('../controllers/menu')
const Restaurant = require('../models/Restaurant')

const restaurantRouter = require('./restaurant')

const router = express.Router()

const {protect, authorize} = require('../middleware/auth')

router.use('/:menuName/restaurant', restaurantRouter)

//router.route('/:id/photo').put(protect, authorize('creater', 'admin'), menuPhotoUpload)

router
  .route('/')
  .get(getMenu)
  .post(protect, authorize('creater', 'admin'), createMenu)

router
  .route('/:id')
  .get(getMenuItem)
  .put(protect, authorize('creater', 'admin'), updateMenu)
  .delete(protect, authorize('creater', 'admin'), deleteMenu)

router
.route('/getRestros')
.post(protect, getRestaurantsWithMenuName)

module.exports = router