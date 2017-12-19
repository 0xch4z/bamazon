'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objection = require('objection');

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DepartmentController {

  /**
   * Find by id
   * 
   * @public
   * @param {String} id 
   * @returns {Department}
   */
  static findById(id) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Department.query().findOne({ id }).eager('products').modifyEager('products', function (builder) {
          builder.orderBy('name');
        });
      } catch ({ message }) {
        console.error(`Error finding Department by ID: ${message}`);
      }
    })();
  }

  /**
   * Find by name
   * 
   * @public
   * @param {String} name 
   * @returns {Department}
   */
  static findByName(name) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Department.query().findOne({ name }).eager('products').modifyEager('products', function (builder) {
          builder.orderBy('name');
        });
      } catch ({ message }) {
        console.error(`Error finding Department by name: ${message}`);
      }
    })();
  }

  /**
   * All
   * 
   * @public
   * @returns {Array<Department>}
   */
  static all() {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Department.query().eager('products').modifyEager('products', function (builder) {
          builder.orderBy('name');
        });
      } catch ({ message }) {
        console.error(`Error finding Department by ID: ${message}`);
      }
    })();
  }

  /**
   * Create
   * 
   * @public
   * @param {Object} graph
   * @returns {Department}
   */
  static create(graph) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield (0, _objection.transaction)(_models.Department.knex(), function (trx) {
          return _models.Department.query(trx).insertGraph(graph);
        });
      } catch ({ message }) {
        console.error(`Error creating Department: ${message}`);
      }
    })();
  }

  /**
   * Update
   * 
   * @public
   * @param {Number} id 
   * @param {Object} graph
   * @returns {Department}
   */
  static updateById(id, graph) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Department.query().patchAndFetchById(id, graph);
      } catch ({ message }) {
        console.error(`Error updating Department by ID: ${message}`);
      }
    })();
  }

  /**
   * Delete
   * 
   * @public
   * @param {Number}
   */
  static deleteById(id) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Department.query().deleteById(id);
      } catch ({ message }) {
        console.error(`Error deleting Department by ID: ${message}`);
      }
    })();
  }

}
exports.default = DepartmentController;