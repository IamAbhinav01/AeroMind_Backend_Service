'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [airplanes] = await queryInterface.sequelize.query(
      "SELECT id, modelNumber FROM Airplanes;"
    );
    const [airports] = await queryInterface.sequelize.query(
      "SELECT code FROM Airports;"
    );

    if (airplanes.length === 0 || airports.length < 2) return;

    const dummyFlights = [];
    
    // Generate 50 random flights spanning the next 90 days
    for (let i = 0; i < 50; i++) {
      // Pick random airplane
      const airplane = airplanes[Math.floor(Math.random() * airplanes.length)];
      
      // Pick two different random airports
      const depAirport = airports[Math.floor(Math.random() * airports.length)].code;
      let arrAirport = airports[Math.floor(Math.random() * airports.length)].code;
      while (arrAirport === depAirport) {
        arrAirport = airports[Math.floor(Math.random() * airports.length)].code;
      }

      // Generate a random date within the next 90 days
      const daysFromNow = Math.floor(Math.random() * 90);
      const depDate = new Date();
      depDate.setDate(depDate.getDate() + daysFromNow);
      depDate.setHours(Math.floor(Math.random() * 18) + 4, 0, 0, 0); // Random hour between 4 AM and 10 PM
      
      const arrDate = new Date(depDate);
      arrDate.setHours(depDate.getHours() + Math.floor(Math.random() * 3) + 2); // 2 to 5 hour flight

      // Random price between 3000 and 15000 INR
      const price = Math.floor(Math.random() * 12000) + 3000;

      dummyFlights.push({
        flightNumber: `AM${1000 + i}`,
        airplaneId: airplane.id,
        departureAirportId: depAirport,
        arrivalAirportId: arrAirport,
        departureTime: depDate,
        arrivalTime: arrDate,
        price: price,
        boardingGate: `G${Math.floor(Math.random() * 10) + 1}`,
        totalSeats: airplane.modelNumber.includes('737') ? 605 : 460,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Flights', dummyFlights, {});
  },

  async down(queryInterface, Sequelize) {
    // Delete only the dynamically generated AM flights
    await queryInterface.bulkDelete('Flights', { flightNumber: { [Sequelize.Op.like]: 'AM%' } }, {});
  },
};
