const Timer = require('../models/Timer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

exports.getCurrentUserTimer = catchAsync(async (req, res, next) => {
  const timer = await Timer.findOne({ user: req.user.id });

  res.status(200).json(timer);
});

exports.createTimer = factory.createOne(Timer);
exports.getTimer = factory.getOne(Timer);
exports.updateTimer = factory.updateOne(Timer);
exports.deleteTimer = factory.deleteOne(Timer);
exports.getAllTimers = factory.getAll(Timer);
