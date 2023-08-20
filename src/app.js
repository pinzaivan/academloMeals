const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const AppError = require('./utils/app.Error');
const globalErrorHandler = require('./controllers/error.controller');

const userRoutes = require('./routes/user.route');
const restaurantRoutes = require('./routes/restaurant.route');
const mealsRoutes = require('./routes/meals.route');
const orderRoutee = require('./routes/order.route.js');

const app = express();
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'To many request from this IP, pleas try again in one hour!',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);

//RUTAS

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/meals', mealsRoutes);
app.use('/api/v1/orders', orderRoutee);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server, sorry !`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
