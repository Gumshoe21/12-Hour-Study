const Report = require('../models/Report');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');

exports.createReport = catchAsync(async (req, res, next) => {
  // Check if a report for today already exists
  let startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  let endOfToday = new Date();
  endOfToday.setUTCHours(23, 59, 59, 999);

  let reportForToday = await Report.findOne().where({
    createdAt: { $gte: startOfToday.toUTCString() },
    user: req.user.id
  });

  if (reportForToday) {
    return next(new AppError('A report already exists for this date.', 422));
  } else {
    const report = await Report.create({
      user: req.user._id.toString()
    });
    res.status(200).json({
      status: 'success',
      report
    });
  }
});

exports.updateReport = catchAsync(async (req, res, next) => {
  let startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  let endOfToday = new Date();
  endOfToday.setUTCHours(23, 59, 59, 999);
  const arlen = 2;
  let updatedReport = await Report.findOneAndUpdate(
    {
      user: req.body.user_id,
      createdAt: { $gte: startOfToday.toUTCString() }
    },
    {
      $inc: {
        [`stats.${req.body.id}.totalTimeAccumulated`]: req.body.progress
      },
      $push: {
        [`stats.${req.body.id}.completions`]: new Date()
      }
    },
    {
      upsert: true,
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    message: 'success',
    data: {
      data: updatedReport
    }
  });
});

exports.getReport = factory.getOne(Report);
exports.getAllReports = factory.getAll(Report);

// exports.deleteAllReports = factory.deleteAll(Report);
// exports.updateReport = factory.updateOne(Report);
exports.getAllReports = factory.getAll(Report);
exports.deleteReport = factory.deleteOne(Report);
