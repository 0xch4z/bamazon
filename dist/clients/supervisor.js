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

class SupervisorClient extends _client2.default {

  static viewSales() {
    return (0, _asyncToGenerator3.default)(function* () {
      const departments = yield _controllers.DepartmentController.all();
      console.table(departments.map(function (dep) {
        return dep.consumable;
      }));
    })();
  }

  static addNewDepartment() {
    return (0, _asyncToGenerator3.default)(function* () {
      const name = yield (0, _utils.prompt)({
        type: 'text',
        message: 'Enter a name for the new department'
      });

      yield _controllers.DepartmentController.create({ name });

      console.log(`Successfully added the new department '${name}'!`);
    })();
  }

}
exports.default = SupervisorClient;
SupervisorClient.operations = [['Browse Inventory', _client2.default.browseInventory], ['View Product Sales by Department', SupervisorClient.viewSales], ['Create new Department', SupervisorClient.addNewDepartment]];