const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/app.Error');

exports.existRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params.id;
  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId || req.params.id,
      status: true,
    },
  });

  if (!restaurant)
    return next(
      new AppError(
        `Restaurant with id:${restaurantId || req.params.id} not found`,
        404
      )
    );
  req.restaurant = restaurant;
  next();
});
