const express = require('express');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');
const router = express.Router();

// router.route('/').get(reportController.getReports);

// router.use(authController.protect);

router
  .route('/createReport')
  .post(authController.protect, reportController.createReport);
/*
router
  .route('/:id')
  .get(reportController.getReport)
  .patch(reportController.updateReport);
*/
module.exports = router;
