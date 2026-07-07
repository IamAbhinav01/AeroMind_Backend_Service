const CrudRepository = require('./crudOperations.repository');
const { Flight, Airplane, Airport, City } = require('../models');
const { LoggerConfig } = require('../config');
const db = require('../models');
const { ErrorHandler } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { FlightQuery } = require('../utils/raw_queries');
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
    const t = await db.sequelize.transaction();
    try {

      // No other transaction can read or write this row until we commit/rollback.
      await db.sequelize.query(FlightQuery(flightId), { transaction: t });

      const flightObject = await Flight.findByPk(flightId, { transaction: t });

      if (!flightObject) {
        await t.rollback();
        throw new ErrorHandler(
          `Flight with id ${flightId} not found`,
          StatusCodes.NOT_FOUND
        );
      }

      const isDecrement = dec === true || dec === 'true' || dec === 1;

      // ── Seat availability check lives INSIDE the lock ────────────────────────
      // This is the critical fix: the check and the update are now atomic.
      // Between the FOR UPDATE lock above and this point, no other transaction
      // can sneak in and read a stale seat count — eliminating the race condition.
      if (isDecrement && flightObject.totalSeats < seats) {
        await t.rollback();
        LoggerConfig.error(
          `[Lock] Insufficient seats for flight ${flightId}: ` +
          `requested ${seats}, available ${flightObject.totalSeats}`
        );
        throw new ErrorHandler(
          `Not enough seats. Requested: ${seats}, Available: ${flightObject.totalSeats}`,
          StatusCodes.BAD_REQUEST
        );
      }

      if (isDecrement) {
        const response = await flightObject.decrement('totalSeats', {
          by: seats,
          transaction: t,
        });
        LoggerConfig.info(
          `[Lock] Decremented ${seats} seats for flight ${flightId}. ` +
          `Remaining: ${flightObject.totalSeats - seats}`
        );
        await t.commit();
        return response;
      } else {
        const response = await flightObject.increment('totalSeats', {
          by: seats,
          transaction: t,
        });
        LoggerConfig.info(
          `[Lock] Restored ${seats} seats for flight ${flightId}. ` +
          `New total: ${flightObject.totalSeats + seats}`
        );
        await t.commit();
        return response;
      }
    } catch (error) {
      try {
        await t.rollback();
      } catch (rollbackError) {
        LoggerConfig.error(`[Lock] Rollback failed: ${rollbackError.message}`);
      }
      LoggerConfig.error(`[Lock] Error in updateSeats: ${error.message}`);
      // Re-throw ErrorHandler instances as-is so the controller gets the right status code
      if (error instanceof ErrorHandler) throw error;
      throw new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
module.exports = FlightRepository;
