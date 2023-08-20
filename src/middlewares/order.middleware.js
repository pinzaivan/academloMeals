const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.model');
const AppError = require('../utils/app.Error');

exports.existOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!order)
    return next(
      new AppError(`the order wiht the id ${id} doesnt exist!!`, 404)
    );
  req.order = order;
  next();
});
