'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _admin = require('./admin');

Object.defineProperty(exports, 'AdminClient', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_admin).default;
  }
});

var _customer = require('./customer');

Object.defineProperty(exports, 'CustomerClient', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_customer).default;
  }
});

var _supervisor = require('./supervisor');

Object.defineProperty(exports, 'SupervisorClient', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_supervisor).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }