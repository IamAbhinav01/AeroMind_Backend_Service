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
    console.log(`error occured ${error}`);
    LoggerConfig.error(`error occured ERROR : ${error}`);
    throw error;
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
module.exports = {
  createAeroplane,
  destroyAeroplane,
};
