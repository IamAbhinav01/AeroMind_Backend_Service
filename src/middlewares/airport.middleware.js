const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { errorResponse } = require('../utils/responseFormatter');
const { ErrorHandler } = require('../errors');

const validateAirport = (req, res, next) => {
  const requiredFields = ['name', 'code', 'cityId'];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      const message = `airport ${field} is not defined`;
      const responsePayload = {
        ...errorResponse,
        message,
        error: new ErrorHandler(message, StatusCodes.BAD_REQUEST),
      };

      LoggerConfig.error(
        `airport ${field} not defined, ERROR Name: ${responsePayload.error.name}, ERROR Message: ${responsePayload.error.message}`
      );
      return res.status(StatusCodes.BAD_REQUEST).json(responsePayload);
    }
  }
  next();
};
module.exports = { validateAirport };
