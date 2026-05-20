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
const getAllFlights = async (query) => {
  try {
    let filtersObject = {};
    let sortObject = [];
    if (query.trips) {
      [departureAirportId, arrivalAirportId] = query.trips.split('-');
      filtersObject = {
        departureAirportId: departureAirportId,
        arrivalAirportId: arrivalAirportId,
      };
      if (departureAirportId == arrivalAirportId) {
        LoggerConfig.error(`Departure and Arrival airport cannot be same`);
        throw new ErrorHandler(
          `Departure and Arrival airport cannot be same`,
          StatusCodes.BAD_REQUEST
        );
      }
    }
    const flightRepository = new FlightRepository();
    const flights = await flightRepository.getAllFlights(
      filtersObject,
      sortObject
    );
    return flights;
  } catch (error) {
    LoggerConfig.error(
      `error occured while fetching the flight data from database ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while fetching the flight data from database ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
module.exports = { createFlight, getAllFlights };
