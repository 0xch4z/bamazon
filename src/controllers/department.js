import { transaction } from 'objection'

import { Product, Department } from '../models'

export default class DepartmentController {

  /**
   * Find by id
   * 
   * @public
   * @param {String} id 
   * @returns {Department}
   */
  static async findById(id) {
    try {
      return await Department.query()
        .findOne({ id })
        .eager('products')
        .modifyEager('products', builder => {
          builder.orderBy('name')
        })
    } catch ({ message }) {
      console.error(`Error finding Department by ID: ${message}`)
    }
  }

  /**
   * Find by name
   * 
   * @public
   * @param {String} name 
   * @returns {Department}
   */
  static async findByName(name) {
    try {
      return await Department.query()
        .findOne({ name })
        .eager('products')
        .modifyEager('products', builder => {
          builder.orderBy('name')
        })
    } catch ({ message }) {
      console.error(`Error finding Department by name: ${message}`)
    }
  }

  /**
   * All
   * 
   * @public
   * @returns {Array<Department>}
   */
  static async all() {
    try {
      return await Department.query()
        .eager('products')
        .modifyEager('products', builder => {
          builder.orderBy('name')
        })
    } catch ({ message }) {
      console.error(`Error finding Department by ID: ${message}`)
    }
  }

  /**
   * Create
   * 
   * @public
   * @param {Object} graph
   * @returns {Department}
   */
  static async create(graph) {
    try {
      return await transaction(Department.knex(), trx =>
        Department.query(trx).insertGraph(graph)
      )
    } catch ({ message }) {
      console.error(`Error creating Department: ${message}`)
    }
  }

  /**
   * Update
   * 
   * @public
   * @param {Number} id 
   * @param {Object} graph
   * @returns {Department}
   */
  static async updateById(id, graph) {
    try {
      return await Department.query().patchAndFetchById(id, graph)
    } catch ({ message }) {
      console.error(`Error updating Department by ID: ${message}`)
    }
  }

  /**
   * Delete
   * 
   * @public
   * @param {Number}
   */
  static async deleteById(id) {
    try {
      return await Department.query().deleteById(id)
    } catch ({ message }) {
      console.error(`Error deleting Department by ID: ${message}`)
    }
  }
  
}
