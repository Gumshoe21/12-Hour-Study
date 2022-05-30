const express = require('express');
const authController = require('../controllers/authController');
const timerController = require('../controllers/timerController');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .route('/')
  .get(timerController.getAllTimers)
  .post(timerController.createTimer);

router.use(authController.protect); // protect all routes that come after this point - b/c middleware runs in sequence - only call next m/w if user is protected

router
  .route('/getCurrentUserTimer')
  .get(userController.getMe, timerController.getCurrentUserTimer);

router
  .route('/:id')
  .get(timerController.getTimer)
  .patch(timerController.updateTimer);

module.exports = router;
