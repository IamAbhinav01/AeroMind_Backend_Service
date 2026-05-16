const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { ErrorHandler } = require('../errors');
const { CitiesRepository } = require('../repositories');
const createCity = async (data) => {
  try {
    const cityRepository = new CitiesRepository();
    const response = await cityRepository.create(data);
    LoggerConfig.info(`successfully created city data -->service layer`);
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
const updateCity = async (data, modelId) => {
  try {
    const cityRepository = new CitiesRepository();
    const response = await cityRepository.update(data, modelId);
    LoggerConfig.info(
      `successfully updated city data with id ${modelId} -->service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while updating the city data with id ${modelId} -->service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while updating the city data with id ${modelId} -->service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const destroyCity = async (modelId) => {
  try {
    const cityRepository = new CitiesRepository();
    const response = await cityRepository.destroy(modelId);
    LoggerConfig.info(
      `successfully deleted the city data with id ${modelId} -->service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.info(
      `error occured while deleting the city data with id ${modelId} -->service layer ERROR : ${error}`
    );

    throw new ErrorHandler(
      `error occured while deleting the city data with id ${modelId} -->service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const getAllCities = async (data) => {
  try {
    const cityRepository = new CitiesRepository();
    const response = await cityRepository.getAll(data);
    LoggerConfig.info(
      `successfully fetched the city data from database --> service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while fetching the city data from database --> service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while fetching the city data from database --> service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const getCity = async (modelId) => {
  try {
    const cityRepository = new CitiesRepository();
    const response = await cityRepository.getById(modelId);
    LoggerConfig.info(
      `successfully fetched the city data from database --> service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while fetching the city data from database --> service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while fetching the city data from database --> service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
module.exports = {
  createCity,
  destroyCity,
  getAllCities,
  getCity,
  updateCity,
};
