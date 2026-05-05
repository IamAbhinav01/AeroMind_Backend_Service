const express = require('express');

const router = express.Router();

router.use('/healthy', (req, res) => {
  console.log(`The response was healthy.`);
  return res.status(200).json({
    message: 'The response was healthy.',
    data: {},
    success: true,
  });
});

module.exports = router;
