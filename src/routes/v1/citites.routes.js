const express = require('express');
const { cititesController } = require('../../controllers');
const { citiesMiddleware } = require('../../middlewares');
const router = express.Router();

router.post('/', citiesMiddleware.validateCity, cititesController.createCity);
router.delete('/:id', cititesController.deleteCity);
router.put('/:id', citiesMiddleware.validateCity, cititesController.updateCity);
router.get('/', cititesController.getAllCities);
router.get('/:id', cititesController.getCity);

module.exports = router;
