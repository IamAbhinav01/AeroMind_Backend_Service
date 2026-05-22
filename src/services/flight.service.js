const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../errors');
const { LoggerConfig } = require('../config');
const FlightRepository = require('../repositories/flight.repository');
const { Op } = require('sequelize');
const { errorResponse } = require('../utils/responseFormatter');

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
    let departureAirportId;
    let arrivalAirportId;
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
    if (query.sort) {
      const [sortField, sortDirection = 'ASC'] = query.sort.split(',');
      const field = sortField.trim();
      const direction = sortDirection.trim().toUpperCase();
      const allowedFields = [
        'price',
        'departureTime',
        'arrivalTime',
        'flightNumber',
        'totalSeats',
      ];
      const allowedDirections = ['ASC', 'DESC'];
      if (!allowedFields.includes(field)) {
        throw new ErrorHandler(
          `Invalid sort field: ${field}. Allowed fields: ${allowedFields.join(
            ', '
          )}`,
          StatusCodes.BAD_REQUEST
        );
      }
      if (!allowedDirections.includes(direction)) {
        throw new ErrorHandler(
          `Invalid sort direction: ${direction}. Use ASC or DESC`,
          StatusCodes.BAD_REQUEST
        );
      }
      sortObject.push([field, direction]);
    }
    if (query.price) {
      [minPrice, maxPrice] = query.price.split('-');
      filtersObject.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    if (query.travellers) {
      filtersObject.totalSeats = {
        [Op.gte]: parseInt(query.travellers),
      };
    }
    if (query.tripDate) {
      const departureDate = new Date(query.tripDate);
      const nextDate = new Date(departureDate);
      nextDate.setDate(departureDate.getDate() + 1);
      filtersObject.departureTime = {
        [Op.between]: [departureDate, nextDate],
      };
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
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching the flight data from database`;
    throw new ErrorHandler(errorResponse, StatusCodes.BAD_REQUEST);
  }
};

const getFlight = async (id) => {
  try {
    const flightRepository = await new FlightRepository();
    const response = await flightRepository.getById(id);
    if (!response) {
      let explanation = `Error finding the data you requested, check the id`;
      let statusCode = StatusCodes.BAD_REQUEST;
      LoggerConfig.error(
        `error occured ERROR : No ID FOUND  \n Error Name: Invalid ID`
      );
      throw new ErrorHandler(explanation, statusCode);
    }
    LoggerConfig.info(`successfully get flight data -->service layer`);
    return response;
  } catch (error) {
    let explanation = error.message;
    let statusCode = StatusCodes.BAD_REQUEST;

    LoggerConfig.error(
      `error occured ERROR : ${error} \n Error Name: ${error.name}`
    );
    throw new ErrorHandler(explanation, statusCode);
  }
};
const updateSeats = async (flightId, seats, dec) => {
  try {
    const flightRepository = new FlightRepository();
    const response = await flightRepository.updateSeats(flightId, seats, dec);
    LoggerConfig.info(`successfully updated seats data -->service layer`);
    return response;
  } catch (error) {
    let explanation = error.message;
    let statusCode = StatusCodes.BAD_REQUEST;

    LoggerConfig.error(
      `error occured ERROR : ${error} \n Error Name: ${error.name}`
    );
    throw new ErrorHandler(explanation, statusCode);
  }
};
module.exports = { createFlight, getAllFlights, getFlight, updateSeats };
