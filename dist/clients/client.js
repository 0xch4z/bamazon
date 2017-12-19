'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../utils');

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Client {

  /**
   * @private 
   */
  static get $operations() {
    return this.operations.map(op => new Operation(op[0], op[1]));
  }

  /**
   * @private 
   */
  static $prompt() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const { $operations } = _this;

      const $op = yield (0, _utils.prompt)({
        type: 'list',
        message: 'Select an operation',
        choices: [...$operations.map(function ($op) {
          return $op.text;
        }), 'Exit']
      });

      if ($op === 'Exit') {
        process.exit(0);
      }

      yield $operations.find(function (op) {
        return op.text === $op;
      }).method();
    })();
  }

  /**
   * @private 
   */
  static $awaitContinue() {
    console.log('\nPress any key to continue...');
    return new Promise(resolve => {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once('data', () => resolve(console.log('\n')));
    });
  }

  /**
   * @public
   */
  static run() {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      while (true) {
        yield _this2.$prompt();
        yield _this2.$awaitContinue();
        (0, _utils.clearConsole)();
      }
    })();
  }

  /**
   * @public
   */
  static browseInventory() {
    return (0, _asyncToGenerator3.default)(function* () {
      let depts = yield _controllers.DepartmentController.all();
      depts = new _utils.HashMap(depts);

      const $dept = yield (0, _utils.prompt)({
        type: 'list',
        message: 'Select a department',
        choices: depts.$keys
      });

      const { products, name } = depts.get($dept);

      if (!products.length) {
        return console.log(`\nNo products in the ${name} department 😢`);
      }

      console.table(products.map(function (prod) {
        return prod.consumable;
      }));
    })();
  }

}

exports.default = Client;
class Operation {

  constructor(text, method) {
    this.text = text;
    this.method = method;
  }

}