'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objection = require('objection');

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Department extends _objection.Model {

  get totalCost() {
    const { products } = this;
    if (!products) return;
    return products.reduce((a, b) => a + b.initialTotalCost, 0);
  }

  get totalRevenue() {
    const { products } = this;
    if (!products) return;
    return products.reduce((a, b) => a + b.revenue, 0);
  }

  get totalProfit() {
    const { totalCost, totalRevenue } = this;
    return Math.max(-totalCost + totalRevenue, 0);
  }

  get consumable() {
    const { id, name, totalRevenue, totalCost, totalProfit } = this;
    return {
      id,
      name,
      totalCost: totalCost.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      totalProfit: totalProfit.toFixed(2)
    };
  }

  addProduct(graph) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const res = yield _controllers.ProductController.create(_this.id, graph);
      return res;
    })();
  }

  update(graph) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      yield _controllers.DepartmentController.update(_this2.id, graph);
    })();
  }

  delete() {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      yield _controllers.DepartmentController.deleteById(_this3.id);
    })();
  }

}
exports.default = Department;
Department.tableName = 'Department';
Department.virtualAttributes = ['profit'];
Department.jsonSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' }
  }
};
Department.relationMappings = {
  products: {
    relation: _objection.Model.HasManyRelation,
    modelClass: __dirname + '/product',
    join: {
      from: 'Department.id',
      to: 'Product.departmentId'
    }
  }
};