const express = require('express');
const aeroplaneRoutes = require('./aeroPlane.routes');
const cityRoutes = require('./citites.routes');
const router = express.Router();

router.use('/aeroplane', aeroplaneRoutes);
router.use('/cities', cityRoutes);
module.exports = router;
