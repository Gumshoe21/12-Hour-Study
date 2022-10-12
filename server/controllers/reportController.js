const Report = require('../models/Report');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const dayjs = require('dayjs');
const { DateTime } = require('luxon')
const getUserStartAndEndOfDay = require('./../helpers/getUserStartAndEndOfDay')


exports.getCurrentUserReports = catchAsync(async (req, res, _next) => {
  const reqQuery = { ...req.query };
  reqQuery.user = req.user.id;
  reqQuery.modes = Array.from(req.query.modes.split(','));

  let barGraphReports = await Report.find({
    user: req.user.id,
    createdAt: { $gt: DateTime.now().setZone(`${req.user.timezone}`).minus({ days: 7 }) } /*dayjs().subtract(7, 'day') },*/
  });

  let barGraph = [];

  for (rpt of Array.from(barGraphReports)) {
    let { session, shortBreak, longBreak } = rpt.stats;

    barGraph.push({
      id: rpt.createdAt.toDateString(),
      ...(reqQuery.modes.includes('session') && {
        session: session.totalTimeAccumulated,
        sessionColor: 'hsl(126, 70% 50%)',
      }),
      ...(reqQuery.modes.includes('shortBreak') && {
        shortBreak: shortBreak.totalTimeAccumulated,
        shortBreakColor: 'hsl(126, 70% 50%)',
      }),
      ...(reqQuery.modes.includes('longBreak') && {
        longBreak: longBreak.totalTimeAccumulated,
        longBreakColor: 'hsl(126, 70% 50%)',
      }),
    });
  }

  let timeRangeReports = await Report.find({ user: req.user.id });
  let timeRange = [];
  for (rpt of Array.from(timeRangeReports)) {
    let { session } = rpt.stats;
    timeRange.push({
      day: dayjs(rpt.createdAt).format('YYYY-MM-DD'),
      value: session.totalTimeAccumulated,
    });
  }

  res.status(200).json({
    barGraph,
    timeRange,
  });
});

exports.updateReport = catchAsync(async (req, res, _next) => {
  const { user_id, timezone } = req.body;

  const { userStartOfDayToUTC, userEndOfDayToUTC } = getUserStartAndEndOfDay(timezone);

  let updatedReport = await Report.findOneAndUpdate(
    {
      user: user_id,
      createdAt: {
        $gte: userStartOfDayToUTC,
        $lte: userEndOfDayToUTC,
      },
    },
    {
      $inc: {
        [`stats.${req.body.id}.totalTimeAccumulated`]: req.body.progress,
      },
      $push: {
        [`stats.${req.body.id}.completions`]: new Date(),
      },
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    message: 'success',
    data: {
      data: updatedReport,
    },
  });
});


exports.updateReportInstances = catchAsync(async (req, res, _next) => {
  const { user_id, timezone } = req.body;

  const { userStartOfDayToUTC, userEndOfDayToUTC } = getUserStartAndEndOfDay(timezone);

  let updatedReport = await Report.findOneAndUpdate(
    {
      user: user_id,
      createdAt: {
        $gte: userStartOfDayToUTC,
        $lte: userEndOfDayToUTC,
      },
    },
    {
      $push: {
        [`stats.${req.body.id}.instances`]: {
          createdAt: new Date(new Date() - req.body.timeAccumulated * 1000),
          timeAccumulated: req.body.timeAccumulated,
          stoppedAt: new Date(new Date()),
        },
      },
      $inc: {
        [`stats.${req.body.id}.totalTimeAccumulated`]: req.body.timeAccumulated,
      },
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    message: 'success',
    data: {
      data: updatedReport,
    },
  });
});

exports.createReport = catchAsync(async (req, res, next) => {
  const { userStartOfDayToUTC, userEndOfDayToUTC } = getUserStartAndEndOfDay(req.user.timezone);

  let reportForToday = await Report.findOne({
    user: req.user._id.toString(),
    createdAt: {
      $gte: userStartOfDayToUTC,
      $lte: userEndOfDayToUTC,
    },
  });

  if (reportForToday)
    return next(new AppError('A report already exists for this date.', 422));

  const newReport = await Report.create({
    user: req.user._id.toString(),
  });

  res.status(200).json({
    status: 'success',
    newReport,
  });
});

exports.adminCreateReport = catchAsync(async (req, res, _next) => {
  const newReport = await Report.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newReport
  });
});

exports.getReport = factory.getOne(Report);
// exports.deleteAllReports = factory.deleteAll(Report);
// exports.updateReport = factory.updateOne(Report);
exports.getAllReports = factory.getAll(Report);
exports.deleteReport = factory.deleteOne(Report);
