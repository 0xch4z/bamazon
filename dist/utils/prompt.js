'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _inquirer = require('inquirer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = opts => {
  return new Promise(resolve => {
    const multi = opts instanceof Array;
    const $opts = multi ? opts : [(0, _extends3.default)({}, opts, { name: 'res' })];
    (0, _inquirer.prompt)($opts).then(res => resolve(multi ? res : res.res));
  });
};