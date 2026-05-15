const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { ErrorHandler } = require('../errors');
const AeroPlaneRepository = require('../repositories/aeroplanes.repository');

const createAeroplane = async (data) => {
  try {
    const aeroPlaneRepository = new AeroPlaneRepository();
    const response = await aeroPlaneRepository.create(data);
    LoggerConfig.info(`successfully created aeroplane data -->service layer`);
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
    throw ErrorHandler(explanation, statusCode);
  }
};
const updateAeroplane = async (data, modelId) => {
  try {
    const aeroPlaneRepository = new AeroPlaneRepository();
    const response = await aeroPlaneRepository.update(data, modelId);
    LoggerConfig.info(
      `successfully updated aeroplane data with id ${modelId} -->service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while updating the aeroplane data with id ${modelId} -->service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while updating the aeroplane data with id ${modelId} -->service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const destroyAeroplane = async (modelId) => {
  try {
    const aeroPlaneRepository = new AeroPlaneRepository();
    const response = await aeroPlaneRepository.destroy(modelId);
    LoggerConfig.info(
      `successfully deleted the aeroplane data with id ${modelId} -->service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.info(
      `error occured while deleting the aeroplane data with id ${modelId} -->service layer ERROR : ${error}`
    );

    throw new ErrorHandler(
      `error occured while deleting the aeroplane data with id ${modelId} -->service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const getAllAeroplanes = async (data) => {
  try {
    const aeroplaneRepository = new AeroPlaneRepository();
    const response = await aeroplaneRepository.getAll(data);
    LoggerConfig.info(
      `successfully fetched the aeroplane data from database --> service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while fetching the aeroplane data from database --> service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while fetching the aeroplane data from database --> service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
const getAeroplane = async (modelId) => {
  try {
    const aeroplaneRepository = new AeroPlaneRepository();
    const response = await aeroplaneRepository.getById(modelId);
    LoggerConfig.info(
      `successfully fetched the aeroplane data from database --> service layer`
    );
    return response;
  } catch (error) {
    LoggerConfig.error(
      `error occured while fetching the aeroplane data from database --> service layer ERROR : ${error}`
    );
    throw new ErrorHandler(
      `error occured while fetching the aeroplane data from database --> service layer ERROR : ${error}`,
      StatusCodes.BAD_REQUEST
    );
  }
};
module.exports = {
  createAeroplane,
  destroyAeroplane,
  getAllAeroplanes,
  getAeroplane,
  updateAeroplane,
};
