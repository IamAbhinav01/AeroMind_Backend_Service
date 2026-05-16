const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { errorResponse } = require('../utils/responseFormatter');
const { ErrorHandler } = require('../errors');

const validateAeroplane = (req, res, next) => {
  if (!req.body.modelNumber) {
    const message = `model number is not defined`;
    const responsePayload = {
      ...errorResponse,
      message,
      error: new ErrorHandler(message, StatusCodes.BAD_REQUEST),
    };
    LoggerConfig.error(
      `modelNumber not defined , ERROR Name: ${responsePayload.error.name} , ERROR Message : ${responsePayload.error.message}`
    );
    return res.status(StatusCodes.BAD_REQUEST).json(responsePayload);
  }
  next();
};
module.exports = { validateAeroplane };
