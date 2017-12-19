'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _controllers = require('../controllers');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomerClient extends _client2.default {

  static purchaseProduct() {
    return (0, _asyncToGenerator3.default)(function* () {
      let depts = yield _controllers.DepartmentController.all();
      depts = new _utils.HashMap(depts);

      const dept = depts.get((yield (0, _utils.prompt)({
        type: 'list',
        message: 'Select a department',
        choices: depts.$keys
      })));

      const products = new _utils.HashMap(dept.products);
      const product = products.get((yield (0, _utils.prompt)({
        type: 'list',
        message: 'Select a product',
        choices: products.$keys
      })));

      if (!product.quantity) {
        return console.log('\nThis item is out of stock 😢');
      }

      const quantity = yield (0, _utils.prompt)({
        type: 'text',
        message: `How many ${product.name}(s) would you like to purchase?`,
        validate: function (n) {
          return _utils.validators.isPositiveInteger(n);
        },
        filter: function (n) {
          return parseInt(n);
        }
      });

      if (quantity > product.quantity) {
        return console.log(`\nInsufficient quantity! There are ${product.quantity} left in stock 😢`);
      }

      yield product.purchase(parseInt(quantity));
      const amount = (product.price * quantity).toFixed(2);

      console.log(`\nYou've purchased ${quantity} ${product.name}(s) for $${amount}!`);
    })();
  }
}
exports.default = CustomerClient;
CustomerClient.operations = [['Browse products', _client2.default.browseInventory], ['Purchase a product', CustomerClient.purchaseProduct]];