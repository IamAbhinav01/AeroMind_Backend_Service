const CrudRepository = require('./crudOperations.repository');
const { City } = require('../models');
class CitiesRepository extends CrudRepository {
  constructor() {
    super(City);
  }
}
module.exports = CitiesRepository;
