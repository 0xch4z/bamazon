import Client from './client'
import { DepartmentController } from '../controllers'
import { prompt, HashMap, validators } from '../utils'

export default class CustomerClient extends Client {

  static operations = [
    ['Browse products', Client.browseInventory],
    ['Purchase a product', CustomerClient.purchaseProduct],
  ]

  static async purchaseProduct() {
    let depts = await DepartmentController.all()
    depts = new HashMap(depts)

    const dept = depts.get((await prompt({
      type: 'list',
      message: 'Select a department',
      choices: depts.$keys
    })))

    const products = new HashMap(dept.products)
    const product = products.get((await prompt({
      type: 'list',
      message: 'Select a product',
      choices: products.$keys
    })))

    if (!product.quantity) {
      return console.log('\nThis item is out of stock 😢')
    }

    const quantity = await prompt({
      type: 'text',
      message: `How many ${product.name}(s) would you like to purchase?`,
      validate: n => validators.isPositiveInteger(n),
      filter: n => parseInt(n),
    })

    await product.purchase(parseInt(quantity))
    const amount = (product.price * quantity).toFixed(2)

    console.log(`\nYou've purchased ${quantity} ${product.name}(s) for $${amount}!`)
  }
}
