import { ProductController, DepartmentController } from '../controllers'
import { prompt } from '../utils'
import Client from './client'

export default class SupervisorClient extends Client {

  static operations = [
    ['Browse Inventory', Client.browseInventory],
    ['View Product Sales by Department', SupervisorClient.viewSales],
    ['Create new Department', SupervisorClient.addNewDepartment],
  ]

  static async viewSales() {
    const departments = await DepartmentController.all()
    console.table(departments.map(dep => dep.consumable))
  }

  static async addNewDepartment() {
    const name = await prompt({
      type: 'text',
      message: 'Enter a name for the new department'
    })

    await DepartmentController.create({ name })

    console.log(`Successfully added the new department '${name}'!`)
  }

}