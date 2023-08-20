const express = require('express');

//controllers
const mealController = require('../controllers/meal.controller');

//middleares
const mealMiddleware = require('../middlewares/meals.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').get(mealController.findAll);

router
  .route('/:id')
  .get(mealMiddleware.existMeal, mealController.findOne)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealController.create
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealMiddleware.existMeal,
    mealController.update
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealMiddleware.existMeal,
    mealController.delete
  );

module.exports = router;
