const express = require('express');
const { flightMiddleware } = require('../../middlewares');
const { flightController } = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  flightMiddleware.validateFlight,
  flightController.createFlight
);
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlight);
module.exports = router;
