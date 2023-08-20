const catchAsync = require('../utils/catchAsync');
const Reviews = require('../models/reviews.model');
const AppError = require('../utils/app.Error');
const User = require('../models/user.model');

exports.existReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Reviews.findOne({
    where: {
      status: true,
      id,
    },
    include: {
      model: User,
    },
  });

  if (!review) return next(new AppError(`Review with id ${id} not found`), 404);

  req.review = review;
  req.user = review.user;

  next();
});
