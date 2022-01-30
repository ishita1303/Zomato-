const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Cart = require('../models/Cart');
const Menu = require('../models/Menu')
const User = require('../models/User')

// Incases where you have to use Mongodb routes in arrays 
//eg in our case for food items we have used it inside a for loop 
// we CANNOT use async and await inside forEach so we write traditional for loops
// And we always make a separate function like the helperFunction in this case
//**Remember this to the T */

//Go through this carefully
const helperFunction = async (items) => {
  totalCost = 0

  for (let i = 0; i < items.length; i++) {
    const menu = await Menu.findById(items[i].menuId);
    console.log(menu)
    const subTotal = menu.price * items[i].quantity;
    totalCost += subTotal;
  }

  return totalCost
}

// @desc      Create cart
// @route     POST /api/v1/cart
// @access    Private
exports.createCart = asyncHandler(async (req, res, next) => {
  const items = req.body.items

  const response = await helperFunction(items)

  console.log(response);

  console.log(totalCost)
  const cart = await Cart.create({
    user: req.user.id,
    items,
    total: totalCost
  });

  res.status(200).json({ success: true, data: cart });
});
