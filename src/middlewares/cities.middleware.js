const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { errorResponse } = require('../utils/responseFormatter');
const { ErrorHandler } = require('../errors');

const validationModel = (req, res, next) => {
  if (!req.body.name) {
    LoggerConfig.error(
      `cityName not defined , ERROR Name: ${errorResponse.error.name} , ERROR Message : ${errorResponse.error.message}`
    );
    errorResponse.message = `cityName is not defined`;
    errorResponse.error = new ErrorHandler(
      errorResponse.message,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
};
module.exports = { validationModel };
