'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Seats', [
      {
        row: 1,
        col: 'A',
        airplaneId: 9,
        type: 'BUISNESS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        row: 1,
        col: 'C',
        airplaneId: 9,
        type: 'FIRST-CLASS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        row: 1,
        col: 'D',
        airplaneId: 10,
        type: 'ECONOMY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Seats', null, {});
  },
};
