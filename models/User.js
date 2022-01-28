const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [20, 'Name can not be more than 20 characters']
  },
 
   phone:  {
    type: String,
    maxlength: [20, 'Phone numbers can not go longer than 20 characters']
  },
  email:{
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    required: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  address: {
    type: String,
    required: [true,'Please add an address']
  }
})

//encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema)
