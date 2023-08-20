const express = require('express');

// controllers

const userController = require('../controllers/user.controller');

// middlewares

const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware.js');

const router = express.Router();

router.post('/signup', userController.create);

router.post('/login', userController.login);

router.use(authMiddleware.protect);

router
  .use('/:id', userMiddleware.existUser)
  .route('/:id')
  .patch(userController.update)
  .delete(userController.delete);

module.exports = router;
