const crypto = require('crypto');
const { promisify } = require('util');
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('./../utils/email');
const User = require('./../models/User');
const Timer = require('./../models/Timer');
const Email = require('./../utils/email');

const signToken = id => {
	return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
		expiresIn: '5d',
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user.id);

	const cookieOptions = {
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		httpOnly: true,
		sameSite: 'none',
		secure: true,
	};

	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		user,
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newTimer = await Timer.create({});

	const avatar = normalize(
		gravatar.url(req.body.email, {
			s: '200',
			r: 'pg',
			d: 'retro',
		}),
		{ forceHttps: true },
	);

	// Use an explicit object instead of req.body, as req.body would allow the user to assign a role and potentially gain admin access.
	const newUser = await User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		passwordChangedAt: req.body.passwordChangedAt,
		avatar: avatar,
		timezone: req.body.timezone,
		role: req.body.role,
		timer: newTimer._id,
	});

	newTimer.user = newUser._id;
	newTimer.save();

	// const url = 0;
	// await new Email(newUser, url).sendWelcome();
	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError('Please provide email and password', 400));
	}

	// Select password to check if it is correct.
	const user = await User.findOne({ email }).select('+password');
	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res) => {
	const cookieOptions = {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
		sameSite: 'none',
		secure: true,
	};
	res.cookie('jwt', 'loggedOut', cookieOptions);
	res.status(202).json({ status: 'success' });
});

exports.protect = catchAsync(async (req, res, next) => {
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
			new AppError('You are not logged in! Please log in to get access', 401),
		);
	}
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				'The user belonging to this token does no longer exist',
				401,
			),
		);
	}
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError('User recently changed password; please log in again', 401),
		);
	}

	req.user = currentUser; // This gives us access to 'role' in the next step.
	res.locals.user = currentUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError('You do not have permission to perform this action.', 403),
			);
		}
		next();
	};
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(
			new AppError(
				'Sorry, there is no user associated with that email address.',
				404,
			),
		);
	}
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	try {
		const resetURL = `${req.headers.referer}resetPassword/${resetToken}`;
		await new Email(user, resetURL).sendPasswordReset();
		res.status(200).json({
			status: 'success',
			message: 'Token sent to email.',
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return next(
			new AppError('There was an error sending the email. Try again later.'),
			500,
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({
		passwordResetToken: req.params.token,
		passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) {
		return next(new AppError('Token is invalid or has expired', 400));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError('Your current password is wrong.', 401));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;

	await user.save();

	createSendToken(user, 200, res);
});
