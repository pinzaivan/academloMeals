const Restaurant = require('../models/restaurants.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
  });
  return res.status(200).json({
    status: 'success',
    messagge: 'your search was successfully',
    restaurants,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  await Restaurant.create({ name, address, rating });
  return res.status(201).json({
    status: 'success',
    message: 'Your Restaurant was created successfully :D',
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    message: 'your search was susccessful',
    restaurant,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  return res.status(200).json({
    status: 'success',
    message: 'your update was susccessful',
    restaurant,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: false });

  return res.status(200).json({
    status: 'success',
    message: 'your delete was susccessful',
  });
});
