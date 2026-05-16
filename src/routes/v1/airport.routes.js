const express = require('express');
const { airportMiddleware } = require('../../middlewares');
const { airportController } = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  airportMiddleware.validateAirport,
  airportController.createAirport
);
router.delete('/:id', airportController.deleteAirport);
router.put(
  '/:id',
  airportMiddleware.validateAirport,
  airportController.updateAirport
);
router.get('/', airportController.getAllAirports);
router.get('/:id', airportController.getAirport);

module.exports = router;
