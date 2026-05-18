const express = require('express');
const { flightMiddleware } = require('../../middlewares');
const { flightController } = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  flightMiddleware.validateFlight,
  flightController.createFlight
);

module.exports = router;
