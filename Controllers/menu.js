const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Menu = require('../models/Menu')

// @desc      GET All Menu items
// @route     GET /api/v1/menu
// @access    Public
exports.getMenu = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query }

  const removeFields = ['select', 'sort']
  removeFields.forEach(param => delete reqQuery[param])

  let queryStr = JSON.stringify(reqQuery)
  queryStr = queryStr.replace(/\b(gt|gte|lt|in)\b/g, match => `$${match}`)

  query = Menu.find(JSON.parse(queryStr))

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join('')
    query = query.sort(sortBy)
  }

  const menu = await query

  res.status(200).json({ success: true, count: menu.length, data: menu })
})


// @desc      GET single Menu item
// @route     GET /api/v1/menu/:id
// @access    Private
exports.getMenuItem = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id)

  if (!menu) {
    return next(
      new ErrorResponse(`Menu item not found with an id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: menu })
})

// @desc      Create Menu item
// @route     POST /api/v1/menu
// @access    Public
exports.createMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.create(req.body)
  res.status(200).json({ success: true, data: menu })
})

// @desc      Update Menu item
// @route     PUT /api/v1/menu/:id
// @access    Private
exports.updateMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!menu) {
    return next(
      new ErrorResponse(`Menu item not found with an id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: menu })
})

// @desc      Delete Menu item
// @route     DELETE /api/v1/menu/:id
// @access    Private
exports.deleteMenu = asyncHandler(async (req, res, next) => {
  const menu = await Menu.findByIdAndDelete(req.params.id)
  if (!menu) {
    return next(
      new ErrorResponse(`Menu item not found with an id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ success: true, data: {} })
})


exports.getRestaurantsWithMenuName = asyncHandler(async (req, res) => {

  const menuName = req.body.menuName;

  try {
    const menu = await Menu.find({ name: menuName })
      .populate('restaurant', 'name photo');

    if (menu.length === 0) {
      return res.status(404).send({
        success: 'false',
        msg: "No menuItem with this name"
      })
    }

    finalResult = []

    menu.forEach(menuItem => {
      console.log(menuItem);
      finalResult.push(menuItem.restaurant)
    });

    if (finalResult.length === 0) {
      return res.status(500).send({
        success: 'false',
        msg: 'Some error occured please try again'
      })
    }

    res.status(200).send({
      success: 'true',
      data: finalResult
    })

  } catch (error) {
    res.status(500).send({
      success: false,
      msg: error.message
    })
  }
})

