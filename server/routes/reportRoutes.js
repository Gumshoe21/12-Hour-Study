const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const reportController = require('../controllers/reportController');

const router = express.Router();

router.use(authController.protect);
router
  .route('/createReport')
  .post(reportController.createReport);

router.route('/adminCreateReport').post(reportController.adminCreateReport)

router.route('/').get(reportController.getAllReports);

router
  .route('/getCurrentUserReports')
  .get(userController.getMe, reportController.getCurrentUserReports);
router
  .route('/updateReportInstances')
  .patch(reportController.updateReportInstances);

router.route('/:id').get(reportController.getReport);

router.route('/updateReport').patch(reportController.updateReport);

module.exports = router;
