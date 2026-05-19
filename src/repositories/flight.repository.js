const CrudRepository = require('./crudOperations.repository');
const { Flight } = require('../models');
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
}
module.exports = FlightRepository;
