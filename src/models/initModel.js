const Meal = require('./meals.model');
const Order = require('./orders.model');
const Restaurant = require('./restaurants.model');
const Reviews = require('./reviews.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Reviews);
  Reviews.belongsTo(User);

  Restaurant.hasMany(Reviews);
  Reviews.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Order);
  Order.belongsTo(Restaurant);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};
module.exports = initModel;
