const Report = require('../models/Report');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');

exports.createReport = catchAsync(async (req, res, next) => {
  // Check if a report for today already exists
  let start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  let end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  /*
  let reportForToday = await Report.find({
    createdAt: { $gte: new Date(new Date()) }
  });
  */
  let reportForToday = await Report.findOne().where({
    createdAt: { $gte: start.toUTCString() },
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
  let start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  let end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  const arlen = 2;
  let updatedReport = await Report.findOneAndUpdate(
    {
      user: req.body.user_id,
      createdAt: { $gte: start.toUTCString() }
    },
    {
      $inc: {
        [`stats.${req.body.id}.totalTimeAccumulated`]: req.body.progress
      },
      $push: {
        [`stats.${req.body.id}.completions`]: new Date()
      }
      /*
      $group: {
        [`stats.${req.body.id}.completions`]: {
          $push: {
            $cond: [
              { $gte: [`stats.${req.body.progress}`, 0] },
              new Date(),
              '$$REMOVE'
            ]
          }
        }
      }
      */
    },

    /*
    {
      $inc: { 'modeCompletions.sessions': 1 },
      $inc: { totalSessionTime: sessionTime },
      $push: {
        sessionInstances: {
          timeAccumulated: 2
        }
      }
    },
    */
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
