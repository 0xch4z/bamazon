import knex from 'knex'
import { Model } from 'objection'

const config = knex(require('../../knexfile'))

Model.knex(config)
