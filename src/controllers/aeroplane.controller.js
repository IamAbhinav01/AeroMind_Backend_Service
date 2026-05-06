const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');
const { AeroplaneService } = require('../services');

async function createAeroplane(req, res) {
  try {
    const reponse = await AeroplaneService.createAeroplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    LoggerConfig.info(
      `successfully send the data to service layer from controll layer`
    );
    return res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: 'sucessfully creaed an airplane',
      data: reponse,
      error: {},
    });
  } catch (error) {
    LoggerConfig.error(`somethign went wrong ERROR: ${error}`);
    console.log(
      `something went wrong while trying to send request to service layer ${error}`
    );
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'somethinf went wrong',
      data: {},
      error: error,
    });
  }
}
module.exports = { createAeroplane };
