const Reviews = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const uid = req.sessionUser.id;

  await Reviews.create({
    comment,
    rating,
    restaurantId: Number(id),
    userId: Number(uid),
  });

  return res.status(200).json({
    status: 'success',
    message: 'your created was successful :D',
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });

  return res.status(200).json({
    status: 'success',
    messagge: 'Your update was successful :D',
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: false });

  return res.status(200).json({
    status: 'success',
    messagge: 'Your delete was successful :D',
  });
});
