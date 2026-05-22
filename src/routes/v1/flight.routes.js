const express = require('express');
const { flightMiddleware } = require('../../middlewares');
const { flightController } = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  flightMiddleware.validateCreationFlight,
  flightController.createFlight
);
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlight);
router.patch(
  '/:id/seats',
  flightMiddleware.validateUpdateSeats,
  flightController.updateSeats
);
module.exports = router;
