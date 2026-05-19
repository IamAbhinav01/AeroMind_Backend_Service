'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [airplanes] = await queryInterface.sequelize.query(
      "SELECT id, modelNumber FROM Airplanes WHERE modelNumber IN ('Boeing 737 MAX 8', 'Airbus A330-900neo');"
    );

    const airplaneMap = airplanes.reduce((map, airplane) => {
      map[airplane.modelNumber] = airplane.id;
      return map;
    }, {});

    await queryInterface.bulkInsert(
      'Flights',
      [
        {
          flightNumber: 'AI101',
          airplaneId: airplaneMap['Boeing 737 MAX 8'],
          departureAirportId: 'COK',
          arrivalAirportId: 'DEL',
          departureTime: new Date('2026-06-01T05:00:00Z'),
          arrivalTime: new Date('2026-06-01T08:30:00Z'),
          price: 8500,
          boardingGate: 'A1',
          totalSeats: 605,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          flightNumber: 'AI202',
          airplaneId: airplaneMap['Airbus A330-900neo'],
          departureAirportId: 'DEL',
          arrivalAirportId: 'TRV',
          departureTime: new Date('2026-06-02T03:00:00Z'),
          arrivalTime: new Date('2026-06-02T08:00:00Z'),
          price: 12000,
          boardingGate: 'B4',
          totalSeats: 460,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          flightNumber: 'AI303',
          airplaneId: airplaneMap['Boeing 737 MAX 8'],
          departureAirportId: 'TRV',
          arrivalAirportId: 'COK',
          departureTime: new Date('2026-06-03T10:00:00Z'),
          arrivalTime: new Date('2026-06-03T11:30:00Z'),
          price: 6500,
          boardingGate: 'C2',
          totalSeats: 605,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {});
  },
};
