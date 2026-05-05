const express = require('express');
const { healthController } = require('../../controllers/');
const router = express.Router();

router.use('/healthy', healthController.health);

module.exports = router;
