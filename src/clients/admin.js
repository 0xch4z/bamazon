import { ProductController, DepartmentController } from '../controllers'
import { HashMap, prompt, validators } from '../utils'
import Client from './client'

export default class AdminClient extends Client {

  static operations = [
    ['Browse Inventory', Client.browseInventory],
    ['View Low Inventory', AdminClient.viewLowInventory],
    ['Add to Inventory', AdminClient.addToInventory],
    ['Add New Product', AdminClient.addNewProduct],
  ]

  static async viewLowInventory() {
    let products = await ProductController.all()

    products = products.filter(prod => prod.isLowStock)

    if (!products.length) {
      return console.log('\nNo low stock item! 👍🏽')
    }

    console.table(products.map(prod => prod.consumable))
  }

  static async addToInventory() {
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
      choices: products.$keys,
    })))

    const quantity = await prompt({
      type: 'text',
      message: `How many ${product.name}(s) should be inserted?`,
      validate: n => validators.isPositiveInteger(n),
      filter: n => parseInt(n),
    })

    const newQuantity = product.quantity + quantity
    await product.setQuantity(newQuantity)

    console.log(`\nThere are now ${newQuantity} ${product.name}(s)!`)
  }

  static async addNewProduct() {
    let depts = await DepartmentController.all()
    depts = new HashMap(depts)

    const dept = depts.get((await prompt({
      type: 'list',
      message: 'Select a department for the item',
      choices: depts.$keys
    })))

    const product = await dept.addProduct((await prompt([
      {
        type: 'text',
        message: 'Enter a name for the item',
        name: 'name',
      },
      {
        type: 'text',
        message: 'Enter the price for the item',
        name: 'price',
        validate: n => validators.isMoney(n),
        filter: n => parseFloat(parseFloat(n).toFixed(2)),
      },
      {
        type: 'text',
        message: 'Enter the initial cost for the item',
        name: 'initialCost',
        validate: n => validators.isMoney(n),
        filter: n => parseFloat(parseFloat(n).toFixed(2)),
      },
      {
        type: 'text',
        message: 'Enter the initial quantity for the item',
        name: 'quantity',
        validate: n => validators.isPositiveInteger(n),
        filter: n => parseInt(n),
      },
    ])))

    console.log(`\nThere are now ${product.quantity} ${product.name}(s) in ${dept.name}!`)
  }

}
