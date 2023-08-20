const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const uid = req.sessionUser.id;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
    },
  });

  if (!meal) {
    next(new AppError(`the meal wiht the id ${mealId} doesnt exist!!`, 404));
  }

  const totalPrice = meal.price * quantity;

  await Order.create({
    mealId,
    totalPrice,
    quantity,
    userId: uid,
  });
  return res.status(201).json({
    status: 'success',
    message: 'Your order was created successfully :D',
  });
});
exports.findAll = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      status: 'completed',
    },
    include: {
      model: Restaurant,
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'This is all your ordens!',
    orders,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { order } = req;
  const { status } = req.params;

  await order.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'your update was susccessful',
    order,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'your delete was susccessful',
    order,
  });
});
