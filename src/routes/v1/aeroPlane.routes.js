const express = require('express');
const { aeroPlanemiddleWare } = require('../../middlewares');
const { aeroplaneController } = require('../../controllers');
const router = express.Router();

router.post(
  '/',
  aeroPlanemiddleWare.validationModel,
  aeroplaneController.createAeroplane
);
router.delete('/:id', aeroplaneController.deleteAeroplane);
router.put(
  '/:id',
  aeroPlanemiddleWare.validationModel,
  aeroplaneController.updateAeroplane
);
router.get('/', aeroplaneController.getAllAeroplanes);
router.get('/:id', aeroplaneController.getAeroplane);

module.exports = router;
