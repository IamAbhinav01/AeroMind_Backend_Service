const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { AeroplaneService } = require('../services');
const { response } = require('express');
const { sucessResponse, errorResponse } = require('../utils/responseFormatter');

async function createAeroplane(req, res) {
  try {
    const reponse = await AeroplaneService.createAeroplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = reponse;
    sucessResponse.message = `successfully created an aeroplane model`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with creation of aeroplane model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function deleteAeroplane(req, res) {
  try {
    const response = await AeroplaneService.destroyAeroplane(req.params.id);
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully deleted the aeroplane model with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with deletion of aeroplane model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function getAllAeroplanes(req, res) {
  try {
    const response = await AeroplaneService.getAllAeroplanes();
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully fetched all aeroplanes`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching all aeroplanes`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function getAeroplane(req, res) {
  try {
    const response = await AeroplaneService.getAeroplane(req.params.id);
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully fetched the aeroplane with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching the aeroplane`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
module.exports = {
  createAeroplane,
  deleteAeroplane,
  getAllAeroplanes,
  getAeroplane,
};
