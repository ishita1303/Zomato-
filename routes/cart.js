const express = require('express')
const {
  createCart
} = require('../controllers/cart')

const Cart = require('../models/Cart')

const router = express.Router({ mergeParams: true })



router
  .route('/')
  .post(createCart)

module.exports = router