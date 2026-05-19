'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Flights', {
      type: 'foreign key',
      name: 'flight_airplane_association',
      fields: ['airplaneId'],
      references: {
        table: 'airplanes',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('Flights', {
      type: 'foreign key',
      name: 'flight_airportArrivalID_association',
      fields: ['arrivalAirportId'],
      references: {
        table: 'airports',
        field: 'code',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('Flights', {
      type: 'foreign key',
      name: 'flight_airportDepartureID_association',
      fields: ['departureAirportId'],
      references: {
        table: 'airports',
        field: 'code',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      'Flights',
      'flight_airplane_association'
    );

    await queryInterface.removeConstraint(
      'Flights',
      'flight_airportArrivalID_association'
    );

    await queryInterface.removeConstraint(
      'Flights',
      'flight_airportDepartureID_association'
    );
  },
};
