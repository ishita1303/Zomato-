const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// @desc - Register user
// @routes - POST /api/v1/auth/register
// @access - public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, address } = req.body

  const user = await User.create({
    name,
    email,
    password,
    address
  })

  const token = user.getSignedJwtToken()

  res.status(200).json({
    success: true, token
  })
})

// @desc - Login user
// @routes - POST /api/v1/auth/login
// @access - public

exports.login = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body

  if(!email || !password){
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  const user = await User.findOne({email}).select('+password')

  if(!user){
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getSignedJwtToken()

  res.status(200).json({
    success: true, token
  })
})

// @desc - Get current logged in user
// @routes - GET /api/v1/auth/me
// @access - private
exports.getMe = asyncHandler(async(req, res, next) =>{
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: user
  })
})
