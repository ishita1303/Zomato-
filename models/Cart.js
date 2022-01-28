const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  AllItems:[{menuId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }},{
  quantity:{
    type: Number,
    required: true,
    min: 1,
    required:['Please include quantity.']
  }}],
  price: {
    type: Number,
    required: true
  },
    totalCost: {
      type: Number,
      default: 0
    }
})

module.exports = mongoose.model('Cart', CartSchema)
