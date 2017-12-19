'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _controllers = require('../controllers');

var _utils = require('../utils');

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdminClient extends _client2.default {

  static viewLowInventory() {
    return (0, _asyncToGenerator3.default)(function* () {
      let products = yield _controllers.ProductController.all();

      products = products.filter(function (prod) {
        return prod.isLowStock;
      });

      if (!products.length) {
        return console.log('\nNo low stock item! 👍🏽');
      }

      console.table(products.map(function (prod) {
        return prod.consumable;
      }));
    })();
  }

  static addToInventory() {
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

      const quantity = yield (0, _utils.prompt)({
        type: 'text',
        message: `How many ${product.name}(s) should be inserted?`,
        validate: function (n) {
          return _utils.validators.isPositiveInteger(n);
        },
        filter: function (n) {
          return parseInt(n);
        }
      });

      const newQuantity = product.quantity + quantity;
      yield product.setQuantity(newQuantity);

      console.log(`\nThere are now ${newQuantity} ${product.name}(s)!`);
    })();
  }

  static addNewProduct() {
    return (0, _asyncToGenerator3.default)(function* () {
      let depts = yield _controllers.DepartmentController.all();
      depts = new _utils.HashMap(depts);

      const dept = depts.get((yield (0, _utils.prompt)({
        type: 'list',
        message: 'Select a department for the item',
        choices: depts.$keys
      })));

      const product = yield dept.addProduct((yield (0, _utils.prompt)([{
        type: 'text',
        message: 'Enter a name for the item',
        name: 'name'
      }, {
        type: 'text',
        message: 'Enter the price for the item',
        name: 'price',
        validate: function (n) {
          return _utils.validators.isMoney(n);
        },
        filter: function (n) {
          return parseFloat(parseFloat(n).toFixed(2));
        }
      }, {
        type: 'text',
        message: 'Enter the initial cost for the item',
        name: 'initialCost',
        validate: function (n) {
          return _utils.validators.isMoney(n);
        },
        filter: function (n) {
          return parseFloat(parseFloat(n).toFixed(2));
        }
      }, {
        type: 'text',
        message: 'Enter the initial quantity for the item',
        name: 'quantity',
        validate: function (n) {
          return _utils.validators.isPositiveInteger(n);
        },
        filter: function (n) {
          return parseInt(n);
        }
      }])));

      console.log(`\nThere are now ${product.quantity} ${product.name}(s) in ${dept.name}!`);
    })();
  }

}
exports.default = AdminClient;
AdminClient.operations = [['Browse Inventory', _client2.default.browseInventory], ['View Low Inventory', AdminClient.viewLowInventory], ['Add to Inventory', AdminClient.addToInventory], ['Add New Product', AdminClient.addNewProduct]];