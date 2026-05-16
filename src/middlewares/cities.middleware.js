const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { errorResponse } = require('../utils/responseFormatter');
const { ErrorHandler } = require('../errors');

const validateCity = (req, res, next) => {
  if (!req.body.name) {
    const message = `cityName is not defined`;
    const responsePayload = {
      ...errorResponse,
      message,
      error: new ErrorHandler(message, StatusCodes.BAD_REQUEST),
    };
    LoggerConfig.error(
      `cityName not defined , ERROR Name: ${responsePayload.error.name} , ERROR Message : ${responsePayload.error.message}`
    );
    return res.status(StatusCodes.BAD_REQUEST).json(responsePayload);
  }
  next();
};
module.exports = { validateCity };
