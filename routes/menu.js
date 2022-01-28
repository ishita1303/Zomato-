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

router.use('/:menuName/restaurant', restaurantRouter)

router
  .route('/')
  .get(getMenu)
  .post(createMenu)

router
  .route('/:id')
  .get(getMenuItem)
  .put(updateMenu)
  .delete(deleteMenu)

router.route('/getRestros').post(getRestaurantsWithMenuName)

module.exports = router