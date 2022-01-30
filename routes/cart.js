const express = require('express')
const {
  createCart
} = require('../controllers/cart')

const Cart = require('../models/Cart')

const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/auth')



router
  .route('/')
  .post(protect, createCart)

module.exports = router