const { LoggerConfig } = require('../config');
const { AeroPlaneRepository } = require('../repositories');

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
module.exports = {
  createAeroplane,
};
