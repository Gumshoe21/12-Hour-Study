class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call constructor of parent class Error.

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Effectively used to check if error is instance of class AppError.
    
    Error.captureStackTrace(this, this.constructor); // When a new instance is created, and a constructor function is called, then that function call will not appear in the stack trace.

  }
}

module.exports = AppError;
