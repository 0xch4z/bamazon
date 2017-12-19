'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objection = require('objection');

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductController {

  /**
   * Find by id
   * 
   * @public
   * @param {String} id 
   * @returns {Product}
   */
  static findById(id) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Product.query().findOne({ id }).eager('department');
      } catch ({ message }) {
        console.error(`Error finding Product by ID: ${message}`);
      }
    })();
  }

  /**
   * Create
   * 
   * @public
   * @param {Number} departmentId
   * @param {Object} graph
   * @returns {Product}
   */
  static create(departmentId, graph) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield (0, _objection.transaction)(_models.Product.knex(), function (trx) {
          return _models.Product.query(trx).insertGraph((0, _extends3.default)({}, graph, {
            departmentId,
            historicQuantity: graph.quantity
          }));
        });
      } catch ({ message }) {
        console.error(`Error creating Product: ${message}`);
      }
    })();
  }

  /**
   * Find by name
   * 
   * @public
   * @param {String} name 
   * @returns {Product}
   */
  static findByName(name) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Product.query().findOne({ name }).eager('department');
      } catch ({ message }) {
        console.error(`Error finding Product by name: ${message}`);
      }
    })();
  }

  /**
   * All
   * 
   * @public
   * @returns {Array<Product>}
   */
  static all() {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Product.query();
      } catch ({ message }) {
        console.error(`Error fetching Products: ${message}`);
      }
    })();
  }

  /**
   * Update
   * 
   * @public
   * @param {Number} id 
   * @param {Object} graph
   * @returns {Product}
   */
  static updateById(id, graph) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Product.query().patchAndFetchById(id, graph);
      } catch ({ message }) {
        console.error(`Error updating Product by ID: ${message}`);
      }
    })();
  }

  /**
   * Delete
   * 
   * @public
   * @param {Number} id
   */
  static deleteById(id) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        return yield _models.Product.query().deleteById(id);
      } catch ({ message }) {
        console.error(`Error deleting Product by ID: ${message}`);
      }
    })();
  }

}
exports.default = ProductController;