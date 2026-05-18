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
    await queryInterface.bulkInsert('Airports', [
      {
        name: 'Cochin International Airport',
        code: 'COK',
        address: 'Nedumbassery, Kochi, Kerala, India',
        cityId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Trivandrum International Airport',
        code: 'TRV',
        address: 'Thiruvananthapuram, Kerala, India',
        cityId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Indira Gandhi International Airport',
        code: 'DEL',
        address: 'New Delhi, Delhi, India',
        cityId: 9,
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
    await queryInterface.bulkDelete('Airports', null, {});
  },
};
