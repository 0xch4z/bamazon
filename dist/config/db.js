'use strict';

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _objection = require('objection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = (0, _knex2.default)(require('../../knexfile'));

_objection.Model.knex(config);