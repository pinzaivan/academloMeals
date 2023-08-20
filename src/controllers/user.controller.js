const AppError = require('../utils/app.Error');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');

const User = require('../models/user.model');

exports.create = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User created succesfully :D',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });
  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'Login successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'your update was successfully :D',
    user,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  return res.status(200).json({
    status: 'success',
    message: 'your delete was successfully :D',
  });
});
