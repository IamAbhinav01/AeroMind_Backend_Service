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
    const [cities] = await queryInterface.sequelize.query(
      "SELECT id, name FROM Cities WHERE name IN ('Kochi', 'Trivandrum', 'New Delhi');"
    );

    const cityMap = cities.reduce((map, city) => {
      map[city.name] = city.id;
      return map;
    }, {});

    await queryInterface.bulkInsert(
      'Airports',
      [
        {
          name: 'Cochin International Airport',
          code: 'COK',
          address: 'Nedumbassery, Kochi, Kerala, India',
          cityId: cityMap['Kochi'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Trivandrum International Airport',
          code: 'TRV',
          address: 'Thiruvananthapuram, Kerala, India',
          cityId: cityMap['Trivandrum'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Indira Gandhi International Airport',
          code: 'DEL',
          address: 'New Delhi, Delhi, India',
          cityId: cityMap['New Delhi'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
