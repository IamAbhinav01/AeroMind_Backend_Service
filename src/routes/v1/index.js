const express = require('express');
const aeroplaneRoutes = require('./aeroPlane.routes');
const cityRoutes = require('./citites.routes');
const airportRoutes = require('./airport.routes');
const flightRoutes = require('./flight.routes');
const router = express.Router();

router.use('/aeroplane', aeroplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airport', airportRoutes);
router.use('/flights', flightRoutes);
module.exports = router;
