const crypto = require('crypto');
const { promisify } = require('util'); // utility for promisify method
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('./../utils/email');
const Timer = require('./../models/Timer');
const { APIVersion } = './../app';
const Email = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '90d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true // so cookie cna't be modified or accessed by browser at all
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // use this instead of User.create(req.body) because that allows anyone to assign role to admin

  const newTimer = await Timer.create({});

  const avatar = normalize(
    gravatar.url(req.body.email, {
      s: '200',
      r: 'pg',
      d: 'retro'
    }),
    { forceHttps: true }
  );

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    avatar: avatar,
    role: req.body.role,
    timer: newTimer._id
  });

  newTimer.user = newUser._id;
  newTimer.save();

  const url = 0;
  // await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) check if user exists && passowrd is correct
  const user = await User.findOne({ email }).select('+password'); // we are selecting password here because we need it in order to check if it is correct - now it will be back in the output
  // short circuiting down here btw
  if (!user || !(await user.correctPassword(password, user.password))) {
    // if not user or password incorrect
    return next(new AppError('Ioncrrect email or password', 401)); // 401 = unauthorized
  }
  // 3) if everything okay, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies['jwt']) {
    token = req.cookies['jwt'];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  //2) verification token - making sure the token hasn't been manipulated by malicious 3rd party
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  // if no one tampered with the token...
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    // if current user doesn't exist, don't give access to route, throw err
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }
  // user does exist at this point
  //4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    // iat = issued at
    return next(
      new AppError('User recently changed password; please log in again', 401)
    );
    // GRANT ACCESS TO PROTECTED ROUTE
  }

  req.user = currentUser; // very important for next step to work, otherwise no access to role
  res.locals.user = currentUser;
  next();
});

// closure
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']
    // because 'user' is not in the roles array, we get this error
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      ); // 403 === forbidden
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError(
        'Sorry, there is no user associated with that email address.',
        404
      )
    );
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.'
    });
    console.log(user);
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later.'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    passwordResetToken: req.params.token,
    passwordResetExpires: { $gt: Date.now() }
  });
  console.log(user);
  //2) if token has not expired and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3) update changedPasswordAt for the user

  //4) Log user in; send JWT to client
  // const token = signToken(user._id);
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) get user from collection
  const user = await User.findById(req.user.id).select('+password');
  // 2) check if POSTed password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in; send JWT to user
  createSendToken(user, 200, res);
});
