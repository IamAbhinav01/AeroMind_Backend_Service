const { sequelize } = require('../models');

async function generateSingleFlight() {
    try {
        const [airplanes] = await sequelize.query("SELECT id, modelNumber FROM Airplanes;");
        const [airports] = await sequelize.query("SELECT code FROM Airports;");
        
        if (airplanes.length === 0 || airports.length < 2) return;

        // Pick random airplane and airports
        const airplane = airplanes[Math.floor(Math.random() * airplanes.length)];
        const depAirport = airports[Math.floor(Math.random() * airports.length)].code;
        let arrAirport = airports[Math.floor(Math.random() * airports.length)].code;
        while (arrAirport === depAirport) {
            arrAirport = airports[Math.floor(Math.random() * airports.length)].code;
        }

        // Random date within the next 90 days
        const daysFromNow = Math.floor(Math.random() * 90);
        const depDate = new Date();
        depDate.setDate(depDate.getDate() + daysFromNow);
        depDate.setHours(Math.floor(Math.random() * 18) + 4, 0, 0, 0); 
        
        const arrDate = new Date(depDate);
        arrDate.setHours(depDate.getHours() + Math.floor(Math.random() * 3) + 2); 

        const price = Math.floor(Math.random() * 12000) + 3000;
        const flightNumber = `AM${Math.floor(Math.random() * 9000) + 1000}`;

        await sequelize.query(`
            INSERT INTO Flights (flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price, boardingGate, totalSeats, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, {
            replacements: [
                flightNumber, airplane.id, depAirport, arrAirport, depDate, arrDate, price,
                `G${Math.floor(Math.random() * 10) + 1}`,
                airplane.modelNumber.includes('737') ? 605 : 460
            ]
        });
        
        console.log(`[Cron] Generated new dynamic flight: ${flightNumber} from ${depAirport} to ${arrAirport}`);
    } catch(err) {
        console.error('[Cron] Failed to generate flight:', err.message);
    }
}

function startFlightGenerator() {
    // Generate 1 flight every 60 seconds
    setInterval(generateSingleFlight, 60000);
}

module.exports = { startFlightGenerator };
