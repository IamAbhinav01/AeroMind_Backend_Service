const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { errorResponse } = require('../utils/responseFormatter');
const { ErrorHandler } = require('../errors');

const validationModel = (req, res, next) => {
  if (!req.body.modelNumber) {
    LoggerConfig.error(`modelNumber not defined`);
    errorResponse.message = `model number is not defined`;
    errorResponse.error = new ErrorHandler(
      errorResponse.message,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};
module.exports = { validationModel };
