const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../errors');
const { LoggerConfig } = require('../config');
const FlightRepository = require('../repositories/flight.repository');

const createFlight = async (data) => {
  try {
    const flightRepository = await new FlightRepository();
    const response = await flightRepository.create(data);
    LoggerConfig.info(`successfully created flight data -->service layer`);
    return response;
  } catch (error) {
    let explanation = error.message;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    if (error.name === 'SequelizeValidationError') {
      explanation = error.errors.map((err) => err.message).join(', ');
      statusCode = StatusCodes.BAD_REQUEST;
    }
    LoggerConfig.error(
      `error occured ERROR : ${error} \n Error Name: ${error.name}`
    );
    throw new ErrorHandler(explanation, statusCode);
  }
};
module.exports = { createFlight };
