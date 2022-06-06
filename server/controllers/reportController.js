const Report = require('../models/Report');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

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
    createdAt: { $gte: start.toUTCString() }
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

exports.updateReport = catchAsync(async (req, res, next) => {
  const sessionTime = req.body.id === 'session' ? req.body.progress : 0;
  let start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  let end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  let updatedReport = await Report.findOneAndUpdate(
    {
      createdAt: { $gte: start.toUTCString() }
    },
    {
      $inc: { 'modeCompletions.sessions': 1 }
      //      $inc: { 'sessionInstances.timeAccumulated': sessionTime }
    },
    {
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
