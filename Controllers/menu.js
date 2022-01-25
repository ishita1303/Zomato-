// // @desc      Get Menu
// @route     GET /api/v1/menu
// @route     GET /api/v1/restaurant/:restaurantId/menu
// @access    Public

// exports.getMenu = asyncHandler(async(req, res, next)=>{
//   if(req.params.restaurantId){
//     comst menu = await Menu.find({restaurant: req.params.restaurantId})
    
//     return res.status(200).json({
//       success: true,
//       count: menu.length,
//       data: menu
//     });
//   } else {
//     res.status(200).json(res.advanceResults);
//   }
// });
// cart ka schema
// all menu items[{
//   menu: uska id
// },
// {quatity: },{price: }]

// @desc      Get single menu item
// @route     GET /api/v1/menu/:id
// @access    Public
// exports.getMenu = asyncHandler(async (req, res, next) => {
//   const menu = await Menu.findById(req.params.id).populate({
//     path: 'bootcamp',
//     select: 'name description'
//   });

//   if (!course) {
//     return next(
//       new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
//     );
//   }

//   res.status(200).json({
//     success: true,
//     data: course
//   });
// });




 