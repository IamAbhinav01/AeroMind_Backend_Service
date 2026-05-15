const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { response } = require('express');
const { sucessResponse, errorResponse } = require('../utils/responseFormatter');
const { CitiesService } = require('../services');

async function createCity(req, res) {
  try {
    const reponse = await CitiesService.createCity({
      name: req.body.name,
    });
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = reponse;
    sucessResponse.message = `successfully created an city model`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with creation of city model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function updateCity(req, res) {
  try {
    const response = await CitiesService.updateCity(
      {
        name: req.body.name,
      },
      req.params.id
    );
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully updated the city with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with updating the city model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function deleteCity(req, res) {
  try {
    const response = await CitiesService.destroyCity(req.params.id);
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully deleted the city with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with deletion of city model`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function getAllCities(req, res) {
  try {
    const response = await CitiesService.getAllCities();
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully fetched all cities`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching all cities`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
async function getCity(req, res) {
  try {
    const response = await CitiesService.getCity(req.params.id);
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    sucessResponse.data = response;
    sucessResponse.message = `successfully fetched the city with id ${req.params.id}`;
    return res.status(StatusCodes.ACCEPTED).json(sucessResponse);
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    errorResponse.data = error;
    errorResponse.message = `something went wrong with fetching the city`;
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
}
module.exports = {
  createCity,
  updateCity,
  deleteCity,
  getAllCities,
  getCity,
};
