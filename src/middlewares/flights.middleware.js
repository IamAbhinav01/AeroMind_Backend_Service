const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { errorResponse } = require('../utils/responseFormatter');
const { ErrorHandler } = require('../errors');
const { flightConstants } = require('../utils/common');
const {
  FlightNumber,
  AirplaneId,
  DepartureAirportId,
  ArrivalAirportId,
  ArrivalTime,
  DepartureTime,
  Price,
  BoardingGate,
  TotalSeats,
} = flightConstants;
const validateCreationFlight = (req, res, next) => {
  const requiredFields = [
    FlightNumber,
    AirplaneId,
    DepartureAirportId,
    ArrivalAirportId,
    ArrivalTime,
    DepartureTime,
    Price,
    BoardingGate,
    TotalSeats,
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
const validateUpdateSeats = (req, res, next) => {
  if (req.body.seats === undefined) {
    const message = `seats is not defined`;
    const responsePayload = {
      ...errorResponse,
      message,
      error: new ErrorHandler(message, StatusCodes.BAD_REQUEST),
    };
    LoggerConfig.error(
      `seat not defined , ERROR Name: ${responsePayload.error.name} , ERROR Message : ${responsePayload.error.message}`
    );
    return res.status(StatusCodes.BAD_REQUEST).json(responsePayload);
  }
  next();
};
module.exports = { validateCreationFlight, validateUpdateSeats };
