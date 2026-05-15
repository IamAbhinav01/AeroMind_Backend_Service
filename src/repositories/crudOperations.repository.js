const { StatusCodes } = require('http-status-codes');
const { LoggerConfig } = require('../config/');
const { ErrorHandler } = require('../errors');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const response = await this.model.create(data);
      LoggerConfig.info(
        `Successfully added data to the Database --> repository layer`
      );
      return response;
    } catch (error) {
      console.log('error occured while creating data to database');
      LoggerConfig.error(
        `error occured while creating data to database ERROR:${error}`
      );
      throw error;
    }
  }
  async update(data, modelId) {}
  async destroy(modelId) {
    try {
      const response = await this.model.destroy({
        where: {
          id: modelId,
        },
      });
      if (!response) {
        LoggerConfig.error(`Not able to delete the data with id ${modelId}`);
        throw new ErrorHandler(
          `Not able to delete the data with id ${modelId}`,
          StatusCodes.BAD_REQUEST
        );
      } else {
        LoggerConfig.info(`Successfully deleted the data with id ${modelId}`);
        return response;
      }
    } catch (error) {
      LoggerConfig.error(
        `Error occured while deleting the data with id ${modelId} ERROR:${error}`
      );
    }
  }
  async getAll(data) {
    try {
      const resonse = await this.model.findAll(data);
      if (!resonse) {
        new ErrorHandler(
          `Not able to fetch the data from database`,
          StatusCodes.BAD_REQUEST
        );
      }
      LoggerConfig.info(`Successfully fetched the data from database`);
      return resonse;
    } catch (error) {
      LoggerConfig.error(
        `Error occured while fetching the data from database ERROR:${error}`
      );
      throw error;
    }
  }
  async getById(modelId) {
    try {
      const response = await this.model.findByPk(modelId);
      if (!response) {
        new ErrorHandler(
          `Not able to fetch the data with id ${modelId}`,
          StatusCodes.BAD_REQUEST
        );
      }
      LoggerConfig.info(`Successfully fetched the data with id ${modelId}`);
      return response;
    } catch (error) {
      LoggerConfig.error(
        `Error occured while fetching the data with id ${modelId} ERROR:${error}`
      );
      throw error;
    }
  }
}

module.exports = CrudRepository;
