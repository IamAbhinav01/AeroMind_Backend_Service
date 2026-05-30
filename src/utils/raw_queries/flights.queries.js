function RawQueryOnFlights(flightId) {
  return ` select * from flights where flights.id = ${flightId} for update`;
}
module.exports = RawQueryOnFlights;
