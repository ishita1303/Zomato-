const mongoose = require('mongoose')
const slugify = require('slugify')

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    // unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [505, 'Description  can not be more than 500 characters']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  availability: {
    type: String,
    enum: [
      'Available',
      'Not Available'
    ],
    required: [true, 'Please include item availability']
  },
  price: {
    type: Number,
    required: [true, 'Please include item price']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Menu', MenuSchema)