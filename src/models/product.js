import { Model } from 'objection'

import Department from './department'
import { ProductController } from '../controllers'

export default class Product extends Model {
  
  static tableName = 'Product'

  static virtualAttributes = [
    'profit',
    'quantitySold',
    'revenue',
    'initialTotalCost',
    'profit',
  ]

  static jsonSchema = {
    type: 'object',
    required: ['name', 'price', 'quantity', 'historicQuantity', 'departmentId'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      price: { type: 'number' },
      initialCost: { type: 'number' },
      quantity: { type: 'integer' },
      historicQuantity: { type: 'integer' },
      departmentId: { type: 'integer' },
    }
  }

  static relationMappings = {
    department: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/department',
      join: {
        from: 'Product.departmentId',
        to: 'Department.id' 
      }
    }
  }

  get isLowStock() {
    return this.quantity < 5
  }

  get quantitySold() {
    return this.historicQuantity - this.quantity
  }

  get revenue() {
    return this.quantitySold * this.price
  }

  get initialTotalCost() {
    return this.historicQuantity * this.initialCost
  }

  get profit() {
    return Math.max(this.revenue - this.initialTotalCost, 0)
  }

  async setQuantity(newQuantity) {
    const { id, quantity, historicQuantity } = this
    const diff = newQuantity - quantity
    await ProductController.updateById(id, {
      quantity: newQuantity,
      historicQuantity: diff < 1 ? historicQuantity : historicQuantity + diff,
    })
  }

  async purchase(quantity) {
    if (quantity > this.quantity) {
      throw Error('Quantity out of bounds')
    }
    await this.setQuantity(this.quantity - quantity)
  }

  get consumable() {
    const { id, name, department, price, quantity } = this
    return {
      id,
      name,
      price,
      quantity,
    }
  }

  async update(graph) {
    await ProductController.updateById(this.id, graph)
  }

  async delete() {
    await ProductController.delete(this.id)
  }

}
