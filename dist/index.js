'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

let main = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* () {
    const clientMap = new _utils.HashMap([{ name: 'Administrator', client: _clients.AdminClient }, { name: 'Supervisor', client: _clients.SupervisorClient }, { name: 'Customer', client: _clients.CustomerClient }]);

    const clientType = yield (0, _utils.prompt)({
      type: 'list',
      message: 'Please select a client to launch',
      choices: clientMap.$keys
    });

    (0, _utils.clearConsole)();
    clientMap.get(clientType).client.run();
  });

  return function main() {
    return _ref.apply(this, arguments);
  };
})();

require('./config/process');

require('./config/db');

require('console.table');

var _objection = require('objection');

var _clients = require('./clients');

var _utils = require('./utils');

var _controllers = require('./controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

main();