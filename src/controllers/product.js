import { transaction } from 'objection'

import { Product, Department } from '../models'

export default class ProductController {

  /**
   * Find by id
   * 
   * @public
   * @param {String} id 
   * @returns {Product}
   */
  static async findById(id) {
    try {
      return await Product.query()
        .findOne({ id })
        .eager('department')
    } catch ({ message }) {
      console.error(`Error finding Product by ID: ${message}`)
    }
  }

  /**
   * Create
   * 
   * @public
   * @param {Number} departmentId
   * @param {Object} graph
   * @returns {Product}
   */
  static async create(departmentId, graph) {
    try {
      return await transaction(Product.knex(), trx =>
        Product.query(trx).insertGraph({ 
          ...graph,
          departmentId,
          historicQuantity: graph.quantity,
        })
      )
    } catch ({ message }) {
      console.error(`Error creating Product: ${message}`)
    }
  }

  /**
   * Find by name
   * 
   * @public
   * @param {String} name 
   * @returns {Product}
   */
  static async findByName(name) {
    try {
      return await Product.query()
        .findOne({ name })
        .eager('department')
    } catch ({ message }) {
      console.error(`Error finding Product by name: ${message}`)
    }
  }

  /**
   * All
   * 
   * @public
   * @returns {Array<Product>}
   */
  static async all() {
    try {
      return await Product.query()
    } catch ({ message }) {
      console.error(`Error fetching Products: ${message}`)
    }
  }

  /**
   * Update
   * 
   * @public
   * @param {Number} id 
   * @param {Object} graph
   * @returns {Product}
   */
  static async updateById(id, graph) {
    try {
      return await Product.query()
        .patchAndFetchById(id, graph)
    } catch ({ message }) {
      console.error(`Error updating Product by ID: ${message}`)
    }
  }

  /**
   * Delete
   * 
   * @public
   * @param {Number} id
   */
  static async deleteById(id) {
    try {
      return await Product.query()
        .deleteById(id)
    } catch ({ message }) {
      console.error(`Error deleting Product by ID: ${message}`)
    }
  }

}
