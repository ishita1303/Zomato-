const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// @desc - Register user
// @routes - POST /api/v1/register
// @access - public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, address } = req.body

  const user = await User.create({
    name,
    email,
    password,
    address
  })

  res.status(200).json({
    success: true, data: user
  })
})
