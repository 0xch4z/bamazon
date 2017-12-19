'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _department = require('./department');

Object.defineProperty(exports, 'Department', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_department).default;
  }
});

var _product = require('./product');

Object.defineProperty(exports, 'Product', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_product).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }