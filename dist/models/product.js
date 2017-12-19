'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objection = require('objection');

var _department = require('./department');

var _department2 = _interopRequireDefault(_department);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Product extends _objection.Model {

  get isLowStock() {
    return this.quantity < 5;
  }

  get quantitySold() {
    return this.historicQuantity - this.quantity;
  }

  get revenue() {
    return this.quantitySold * this.price;
  }

  get initialTotalCost() {
    return this.historicQuantity * this.initialCost;
  }

  get profit() {
    return Math.max(this.revenue - this.initialTotalCost, 0);
  }

  setQuantity(newQuantity) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { id, quantity, historicQuantity } = _this;
      const diff = newQuantity - quantity;
      yield _controllers.ProductController.updateById(id, {
        quantity: newQuantity,
        historicQuantity: diff < 1 ? historicQuantity : historicQuantity + diff
      });
    })();
  }

  purchase(quantity) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      yield _this2.setQuantity(_this2.quantity - quantity);
    })();
  }

  get consumable() {
    const { id, name, department, price, quantity } = this;
    return {
      id,
      name,
      price,
      quantity
    };
  }

  update(graph) {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      yield _controllers.ProductController.updateById(_this3.id, graph);
    })();
  }

  delete() {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      yield _controllers.ProductController.delete(_this4.id);
    })();
  }

}
exports.default = Product;
Product.tableName = 'Product';
Product.virtualAttributes = ['profit', 'quantitySold', 'revenue', 'initialTotalCost', 'profit'];
Product.jsonSchema = {
  type: 'object',
  required: ['name', 'price', 'quantity', 'historicQuantity', 'departmentId'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    price: { type: 'number' },
    initialCost: { type: 'number' },
    quantity: { type: 'integer' },
    historicQuantity: { type: 'integer' },
    departmentId: { type: 'integer' }
  }
};
Product.relationMappings = {
  department: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: __dirname + '/department',
    join: {
      from: 'Product.departmentId',
      to: 'Department.id'
    }
  }
};