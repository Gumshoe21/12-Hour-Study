const Report = require('../models/Report');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const mongoose = require('mongoose');

exports.getCurrentUserReports = catchAsync(async (req, res, next) => {
  const reqQuery = { ...req.query };
  reqQuery.user = req.user.id;
  reqQuery.modes = req.query.modes.split(',');

  let reports = await Report.find({ user: req.user.id });

  let body = [];
  for (report of Array.from(reports)) {
    let { session, shortBreak, longBreak } = report.stats;

    body.push({
      id: report.createdAt.toDateString(),

      ...(Array.from(reqQuery.modes).includes('session') && {
        session: session.totalTimeAccumulated,
        sessionColor: 'hsl(126, 70% 50%)'
      }),

      shortBreak: shortBreak.totalTimeAccumulated,
      shortBreakColor: 'hsl(126, 70% 50%)',

      longBreak: longBreak.totalTimeAccumulated,
      longBreakColor: 'hsl(126, 70% 50%)'
      // sessionCompletions: session.completions,
      // sessionInstances: session.instances,
      // shortBreakCompletions: shortBreak.completions,
      // shortBreakInstances: shortBreak.instances,
      // longBreakCompletions: longBreak.completions,
      // longBreakInstances: longBreak.instances,

      //      shortBreakTotalTime: shortBreak.totalTimeAccumulated,
      //     longBreakTotalTime: longBreak.totalTimeAccumulated
    });
  }
  res.status(200).json(body);
});

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

exports.updateReportInstances = catchAsync(async (req, res, next) => {
  let startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  let endOfToday = new Date();
  endOfToday.setUTCHours(23, 59, 59, 999);
  let updatedReport = await Report.findOneAndUpdate(
    {
      user: req.body.user_id,
      createdAt: { $gte: startOfToday.toUTCString() }
    },
    {
      $push: {
        [`stats.${req.body.id}.instances`]: {
          createdAt: new Date(new Date() - req.body.timeAccumulated * 1000),
          timeAccumulated: req.body.timeAccumulated,
          stoppedAt: new Date(new Date())
        }
      },
      $inc: {
        [`stats.${req.body.id}.totalTimeAccumulated`]: req.body.timeAccumulated
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

// exports.deleteAllReports = factory.deleteAll(Report);
// exports.updateReport = factory.updateOne(Report);
exports.getAllReports = factory.getAll(Report);
exports.deleteReport = factory.deleteOne(Report);
