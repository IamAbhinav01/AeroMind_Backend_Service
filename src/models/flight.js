'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane, { foreignKey: 'airplaneId', as: 'airplane' });
      this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        targetKey: 'code',
        as: 'departureAirport',
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        targetKey: 'code',
        as: 'arrivalAirport',
      });
    }
  }
  Flight.init({
    flightNumber: DataTypes.STRING,
    airplaneId: DataTypes.INTEGER,
    departureAirportId: DataTypes.STRING,
    arrivalAirportId: DataTypes.STRING,
    arrivalTime: DataTypes.DATE,
    departureTime: DataTypes.DATE,
    price: DataTypes.INTEGER,
    boardingGate: DataTypes.STRING,
    totalSeats: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};