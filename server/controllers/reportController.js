const Report = require('../models/Report');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.createReport = catchAsync(async (req, res, next) => {
  // Check if a report for today already exists
  /*
  let reportForToday = await Report.find({
    createdAt: { $gte: new Date(new Date()) }
  });
  */
  let reportForToday = await Report.find().where({
    createdAt: { $gte: new Date(new Date()) }
  });

  if (reportForToday) {
    return next(new AppError('A report already exists for this date.', 422));
  } else {
    const report = await Report.create({
      user: req.user.id
    });
    res.status(200).json({
      status: 'success',
      report
    });
  }
});
/*
const updateReport = catchAsync(async (req, res, next) => {
  let review = review.findByIdAndUpdate(req.review.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200);
});
*/
exports.getReport = factory.getOne(Report);
exports.updateReport = factory.updateOne(Report);
exports.getAllReports = factory.getAll(Report);
// exports.deleteReport = factory.deleteOne(Report);
