const express = require('express');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');
const router = express.Router();

router
  .route('/createReport')
  .post(authController.protect, reportController.createReport);

router.route('/:id').get(reportController.getReport);

router.route('/').get(reportController.getAllReports);

router.use(authController.protect);

router.route('/updateReport').patch(reportController.updateReport);
module.exports = router;
