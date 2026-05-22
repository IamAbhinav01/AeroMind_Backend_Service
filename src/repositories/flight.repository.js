const CrudRepository = require('./crudOperations.repository');
const { Flight, Airplane, Airport, City } = require('../models');
const { LoggerConfig } = require('../config');
const { ErrorHandler } = require('../errors');
const { StatusCodes } = require('http-status-codes');
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
  async getAllFlights(filters, sort) {
    try {
      const details = await Flight.findAll({
        where: filters,
        order: sort,
        include: [
          {
            model: Airplane,
            as: 'airplane',
            required: true,
          },
          {
            model: Airport,
            as: 'departureAirport',
            required: false,
            include: [
              {
                model: City,
                as: 'cityDetails',
              },
            ],
          },
          {
            model: Airport,
            as: 'arrivalAirport',
            required: false,
            include: [
              {
                model: City,
                as: 'cityDetails',
              },
            ],
          },
        ],
      });
      return details;
    } catch (error) {
      LoggerConfig.error(
        `Error occured while fetching the data from database ERROR:${error}`
      );
      throw new ErrorHandler(
        `Error occured while fetching the data from database ERROR:${error}`,
        StatusCodes.BAD_REQUEST
      );
    }
  }
  async updateSeats(flightId, seats, dec = true) {
    try {
      const flightObject = await Flight.findByPk(flightId);
      if (dec == true || dec == 'true' || dec == 1) {
        const response = await flightObject.decrement('totalSeats', {
          by: seats,
        });
        LoggerConfig.info(`successfully update response`);
        return response;
      } else {
        const response = await flightObject.increment('totalSeats', {
          by: seats,
        });
        LoggerConfig.info(`successfully update response`);
        return response;
      }
    } catch (error) {
      let explanation = error.message;
      let statusCodes = error.statusCodes;
      LoggerConfig.error(`error occured while updating seats`);
      throw new ErrorHandler(explanation, statusCodes);
    }
  }
}
module.exports = FlightRepository;
