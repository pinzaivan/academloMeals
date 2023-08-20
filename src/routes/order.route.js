const express = require('express');

//controllers
const orderController = require('../controllers/oder.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const orderMiddleware = require('../middlewares/order.middleware');

const router = express.Router();

router.route('/').post(authMiddleware.protect, orderController.create);

router.route('/me').get(authMiddleware.protect, orderController.findAll);

router
  .route('/:id')
  .patch(
    authMiddleware.protect,
    orderMiddleware.existOrder,
    orderController.update
  )
  .delete(
    authMiddleware.protect,
    orderMiddleware.existOrder,
    orderController.delete
  );

module.exports = router;
