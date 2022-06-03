const Report = require('./../models/Report');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.createReport = catchAsync(async (req, res, next) => {
  // Check if a report for today already exists
  if (
    Report.findOne({
      user: req.user.id,
      createdAt: { $gte: new Date() }
    })
  ) {
    return new AppError('A report already exists for this date.', 422);
  } else {
    const report = await Report.create({
      user: req.user.id
    });
    res.status(200).json({
      status: 'success',
      report
    });
  }

  // if a report does exist, don't create one and return res.status 422 (unprocessable entity)

  // else, create a report with the user's id in it.
});
/*
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getAllReview = factory.getAll(Review);
*/
