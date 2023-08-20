const Meal = require('../models/meals.model');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const Rid = req.params.id;

  await Meal.create({ name, price, restaurantId: Rid });
  return res.status(201).json({
    status: 'success',
    message: 'Your Meal was created successfully :D',
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { meal } = req;

  const restaurant = await meal.getRestaurant();

  return res.status(200).json({
    status: 'success',
    message: 'your search was susccessful',
    meal,
    restaurant,
  });
});
exports.findAll = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: true,
    },
  });
  const mealsWithRestaurant = await Promise.all(
    meals.map(async (meal) => {
      const restaurant = await meal.getRestaurant();
      return {
        meal,
        restaurant,
      };
    })
  );

  return res.status(200).json({
    status: 'success',
    messagge: 'your search was successful, these are all your meals ;)',
    meals: mealsWithRestaurant,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  return res.status(200).json({
    status: 'success',
    message: 'your update was susccessful',
    meal,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: false });

  return res.status(200).json({
    status: 'success',
    message: 'your delete was susccessful',
  });
});
