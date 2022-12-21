const AppError = require('../utils/appError')

const handleMongoDbCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

// Handles MongodDB error code E11000 - "duplicate key error collection".
const handleMongoDbDuplicateKeyError = (err) => {
  const value = err.keyValue.name
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}
const handleMongoDbValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid input data. ${errors.join('; ')}`
  return new AppError(message, 400)
}
const handleJwtError = () => new AppError('Invalid token. Please log in again', 401)
const handleJwtExpiredError = () => new AppError('Your token has expired; please login again', 401)
const sendErrorDev = (err, res) => {
  console.log(err)
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500 // defining default status code. the code = the statusCode or error 500 or internal server error
  err.status = err.status || 'error' // status we have when we get a status code of 500

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    error.name = err.name
    if (error.name === 'CastError') error = handleMongoDbCastError(error)
    if (error.code === 11000) error = handleMongoDbDuplicateKeyError(error)
    if (error.name === 'ValidationError') error = handleMongoDbValidationError(error)
    if (error.name === 'JsonWebTokenError') error = handleJwtError()
    if (error.name === 'TokenExpiredError') error = handleJwtExpiredError()
    sendErrorProd(error, res)
  }
}
