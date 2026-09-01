const express = require('express');
const { ServerConfig, LoggerConfig } = require('./config');
const apiRoutes = require('./routes');
const { startFlightGenerator } = require('./cron/dynamicFlights');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/health'], (req, res) => {
  res.status(200).json({ status: 'ok', service: 'aeromind-backend' });
});

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`server started at port: ${ServerConfig.PORT}`);
  LoggerConfig.info(`server started at port: ${ServerConfig.PORT}`);
  
  // Start the continuous background flight generator
  startFlightGenerator();
});
