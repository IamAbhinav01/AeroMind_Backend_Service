const { LoggerConfig } = require('../config/');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const response = await this.create(data);
      LoggerConfig.info(`Successfully added data to the Database `);
      return response;
    } catch (error) {
      console.log('error occured while creating data to database');
      LoggerConfig.error(
        `error occured while creating data to database ERROR:${error}`
      );
      throw error;
    }
  }
}

module.exports = CrudRepository;
