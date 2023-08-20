const catchAsync = require('../utils/catchAsync');
const Meals = require('../models/meals.model');
const AppError = require('../utils/app.Error');

exports.existMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meals.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!meal)
    return next(
      new AppError(`the meal with the id ${id} doesnt exist sorry`, 404)
    );
  req.meal = meal;
  next();
});
