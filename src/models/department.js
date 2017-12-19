import { Model } from 'objection'

import { DepartmentController, ProductController } from '../controllers'

export default class Department extends Model {
  
  static tableName = 'Department'

  static virtualAttributes = [
    'profit'
  ]

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    }
  }

  static relationMappings = {
    products: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/product',
      join: {
        from: 'Department.id',
        to: 'Product.departmentId'
      }
    }
  }

  get totalCost() {
    const { products } = this
    if (!products) return
    return products.reduce(((a, b) => a + b.initialTotalCost), 0)
  }

  get totalRevenue() {
    const { products } = this
    if (!products) return
    return products.reduce(((a, b) => a + b.revenue), 0)
  }

  get totalProfit() {
    const { totalCost, totalRevenue } = this
    return Math.max(-totalCost + totalRevenue, 0)
  }

  get consumable() {
    const { id, name, totalRevenue, totalCost, totalProfit } = this
    return {
      id,
      name,
      totalCost: totalCost.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
    }
  }

  async addProduct(graph) {
    const res = await ProductController.create(this.id, graph)
    return res
  }

  async update(graph) {
    await DepartmentController.update(this.id, graph)
  }

  async delete() {
    await DepartmentController.deleteById(this.id)
  }

}
