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

async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    sucessResponse.data = flights;
    sucessResponse.message = `successfully fetched the flights data`;
    return res.status(StatusCodes.OK).json(sucessResponse);
  } catch (error) {
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching the flight data`;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    sucessResponse.data = flight;
    sucessResponse.message = `successfully fetched the flight data`;
    return res.status(StatusCodes.OK).json(sucessResponse);
  } catch (error) {
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching the flight data`;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
async function updateSeats(req, res) {
  try {
    const flight = await FlightService.updateSeats(
      req.params.id,
      req.body.seats,
      req.body.dec
    );
    sucessResponse.data = flight;
    sucessResponse.message = `successfully updated the flight seats`;
    return res.status(StatusCodes.OK).json(sucessResponse);
  } catch (error) {
    errorResponse.data = error;
    errorResponse.message = error.message || `something went wrong with updating the flight seats`;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse);
  }
}
module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
