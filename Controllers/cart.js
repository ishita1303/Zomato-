const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Cart = require('../models/Cart');
const Menu = require('../models/Menu')
const User = require('../models/User')

// @desc      Create cart
// @route     POST /api/v1/cart
// @access    Private
exports.createCart = asyncHandler(async(req, res, next)=>{
  const items = req.body.items

  totalCost = 0

items.forEach(async menuItem => {
  const menu = await Menu.findById(menuItem.menuId);
  console.log(menu)
  const subTotal = menu.price*menuItem.quantity;
  totalCost += subTotal;
});
console.log(totalCost)
// const cart = await Cart.create({
//   user: req.user.id,
//   items,
//   total: totalCost
// });

//res.status(200).json({ success: true, data: cart });
});
