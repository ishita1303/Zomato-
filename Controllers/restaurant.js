const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');


// @desc      Create restaurants
// @route     POST /api/v1/restaurants
// @route     POST /api/v1/menu/:menuId/restaurants
// @access    Public
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

// @desc      Get single restaurant
// @route     GET /api/v1/restaurant/:id
// @access    Public
exports.getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id)

  if(!restaurant){
    return next(new ErrorResponse(`No restaurant with the id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: restaurant
  })
})

// @desc      Update single restaurant
// @route     PUT /api/v1/restaurant/:id
// @access    Public
exports.updateRestaurant = asyncHandler(async (req, res, next) => {
  let restaurant = await Restaurant.findById(req.params.id)

  if(!restaurant){
    return next(new ErrorResponse(`No restaurant with the id of ${req.params.id}`, 404))
  }

  restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: restaurant
  })
})

// @desc      Delete single restaurant
// @route     DELETE /api/v1/restaurant/:id
// @access    Public
exports.deleteRestaurant = asyncHandler(async (req, res, next) => {
 const restaurant = await Restaurant.findById(req.params.id)

  if(!restaurant){
    return next(new ErrorResponse(`No restaurant with the id of ${req.params.id}`, 404))
  }

  await restaurant.remove()

  res.status(200).json({
    success: true,
    data: { }
  })
})

