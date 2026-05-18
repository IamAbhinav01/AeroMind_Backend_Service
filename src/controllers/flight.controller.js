const { FlightService } = require('../services');
const { sucessResponse, errorResponse } = require('../utils/responseFormatter');
const { StatusCodes } = require('http-status-codes');

async function createFlight(req, res) {
  try {
    const flightData = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    sucessResponse.data = flightData;
    sucessResponse.message = `successfully created a flight model`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    errorResponse.data = error;
    errorResponse.message = `something went wrong with creation of flight model`;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

module.exports = {
  createFlight,
};
