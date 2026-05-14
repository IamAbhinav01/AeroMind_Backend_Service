const CrudRepository = require('./crudOperations.repository');
const { Airplane } = require('../models');
class AeroPlaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
}
module.exports = AeroPlaneRepository;
