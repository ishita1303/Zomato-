const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

// @desc      Get restaurants
// @route     GET /api/v1/restaurants
// @route     GET /api/v1/menu/:menuId/restaurants
// @access    Public
exports.getRestaurants = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.menuName) {
    query = Restaurant.find({ menu: req.params.menuName })
  } else {
    query = Restaurant.find()
  }
  const restaurants = await query

  res.status(200).json({
    success: true,
    count: restaurants.length,
    data: restaurants
  })
})


exports.createRestaurant = asyncHandler(async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    if (!restaurant) {
      return res.status(404).send({
        success: 'false',
        msg: "Restro was not created."
      })
    }
    res.status(200).send(restaurant)
  } catch (error) {
    res.status(500).send(error)
  }
})