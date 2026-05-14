const express = require('express');
const aeroplaneRoutes = require('./aeroPlane.routes');
const router = express.Router();

router.use('/aeroplane', aeroplaneRoutes);

module.exports = router;
