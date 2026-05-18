const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { errorResponse } = require('../utils/responseFormatter');
const { ErrorHandler } = require('../errors');

const validateFlight = (req, res, next) => {
  const requiredFields = [
    'flightNumber',
    'airplaneId',
    'departureAirportId',
    'arrivalAirportId',
    'arrivalTime',
    'departureTime',
    'price',
    'boardingGate',
    'totalSeats',
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      const message = `flight ${field} is not defined`;
      const responsePayload = {
        ...errorResponse,
        message,
        error: new ErrorHandler(message, StatusCodes.BAD_REQUEST),
      };

      LoggerConfig.error(
        `flight ${field} not defined, ERROR Name: ${responsePayload.error.name}, ERROR Message: ${responsePayload.error.message}`
      );
      return res.status(StatusCodes.BAD_REQUEST).json(responsePayload);
    }
  }
  next();
};
module.exports = { validateFlight };
