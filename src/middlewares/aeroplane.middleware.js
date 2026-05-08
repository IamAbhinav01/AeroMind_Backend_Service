const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config');

const validationModel = (req, res, next) => {
  if (!req.body.modelNumber) {
    LoggerConfig.error(`modelNumber not defined`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'somethinf went wrong',
      data: {},
      error: `model number not defined`,
    });
  }
  next();
};
module.exports = { validationModel };
