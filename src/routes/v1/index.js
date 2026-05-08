const express = require('express');
const { healthController, aeroplaneController } = require('../../controllers/');
const { aeroPlanemiddleWare } = require('../../middlewares');
const router = express.Router();

router.use(
  '/aeroplane',
  aeroPlanemiddleWare.validationModel,
  aeroplaneController.createAeroplane
);
router.use('/healthy', healthController.health);

module.exports = router;
