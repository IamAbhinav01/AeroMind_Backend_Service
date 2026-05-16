const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { AirportService } = require('../services');
const { response } = require('express');
const { sucessResponse, errorResponse } = require('../utils/responseFormatter');

async function createAirport(req, res) {
  try {
    const reponse = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = reponse;
    sucessResponse.message = `successfully created an Airport model`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with creation of Airport model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function updateAirport(req, res) {
  try {
    const response = await AirportService.updateAirport(
      {
        name: req.body.name,
        code: req.body.code,
        address: req.body.address,
        cityId: req.body.cityId,
      },
      req.params.id
    );
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully updated the Airport model with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with updating the Airport model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function deleteAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully deleted the Airport model with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with deletion of Airport model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function getAllAirports(req, res) {
  try {
    const response = await AirportService.getAllAirports();
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully fetched all Airports`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching all Airports`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function getAirport(req, res) {
  try {
    const response = await AirportService.getAirport(req.params.id);
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully fetched the Airport with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching the Airport`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
module.exports = {
  createAirport,
  deleteAirport,
  getAllAirports,
  getAirport,
  updateAirport,
};
