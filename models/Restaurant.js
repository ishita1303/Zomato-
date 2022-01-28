const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  description: {
    type: String,
    require: [true, 'Please add a description'],
    trim: true,
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  address: {
    type: String,
    required: [true,'Please add an address']
  },
  rating: {
    type: Number,
    min: 1,
    max:10,
    required: [true, 'Please add a rating between 1 and 10']
  },
  food:{
    type: String,
    required: true,
    enum:[
      'Veg',
      'Non-Veg',
      'Veg and Non-Veg'
    ]
  },
  photo:{
    type: String,
    default: 'no-photo.jpg'
  },
  opening:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)
