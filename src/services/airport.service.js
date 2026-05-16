const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { ErrorHandler } = require('../errors');
const { AirPortRepository } = require('../repositories');

const createAirport = async (data) => {
  try {
    const airportRepository = new AirPortRepository();
    const response = await airportRepository.create(data);
    LoggerConfig.info(`successfully created Airport data -->service layer`);
    return response;
  } catch (error) {
    let explanation = error.message;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    if (error.name === 'SequelizeValidationError') {
      explanation = error.errors.map((err) => err.message).join(', ');
      statusCode = StatusCodes.BAD_REQUEST;
    }

    LoggerConfig.error(`error occured ERROR : ${error}
      \n Error Name: ${error.name}`);
    throw new ErrorHandler(explanation, statusCode);
  }
};
const updateAirport = async (data, modelId) => {
  try {
    const airportRepository = new AirPortRepository();
    const response = await airportRepository.update(data, modelId);
    LoggerConfig.info(
      `successfully updated Airport data with id ${modelId} -->service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while updating the Airport data with id ${modelId} -->service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while updating the Airport data with id ${modelId} -->service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const destroyAirport = async (modelId) => {
  try {
    const airportRepository = new AirPortRepository();
    const response = await airportRepository.destroy(modelId);
    LoggerConfig.info(
      `successfully deleted the Airport data with id ${modelId} -->service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.info(
      `error occured while deleting the Airport data with id ${modelId} -->service layer ERROR : ${error}`
    );

    throw new ErrorHandler(
      `error occured while deleting the Airport data with id ${modelId} -->service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const getAllAirports = async (data) => {
  try {
    const airportRepository = new AirPortRepository();
    const response = await airportRepository.getAll(data);
    LoggerConfig.info(
      `successfully fetched the Airport data from database --> service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while fetching the Airport data from database --> service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while fetching the Airport data from database --> service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const getAirport = async (modelId) => {
  try {
    const airportRepository = new AirPortRepository();
    const response = await airportRepository.getById(modelId);
    LoggerConfig.info(
      `successfully fetched the Airport data from database --> service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while fetching the Airport data from database --> service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while fetching the Airport data from database --> service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
module.exports = {
  createAirport,
  destroyAirport,
  getAllAirports,
  getAirport,
  updateAirport,
};
