const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const reportController = require('../controllers/reportController');
const router = express.Router();

router
  .route('/createReport')
  .post(authController.protect, reportController.createReport);

router.route('/').get(reportController.getAllReports);

router.use(authController.protect);
router
  .route('/getCurrentUserReports')
  .get(userController.getMe, reportController.getCurrentUserReports);
router
  .route('/updateReportInstances')
  .patch(reportController.updateReportInstances);

router.route('/:id').get(reportController.getReport);

router.route('/updateReport').patch(reportController.updateReport);

module.exports = router;
