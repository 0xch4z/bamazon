import { clearConsole, prompt, HashMap } from '../utils'
import { DepartmentController } from '../controllers';

export default class Client {

  /**
   * @private 
   */
  static get $operations() {
    return this.operations.map(op =>
      new Operation(op[0], op[1])
    )
  }

  /**
   * @private 
   */
  static async $prompt() {
    const { $operations } = this

    const $op = await prompt({
      type: 'list',
      message: 'Select an operation',
      choices: [
        ...$operations.map($op => $op.text), 'Exit'
      ]
    })

    if ($op === 'Exit') {
      process.exit(0)
    }

    await $operations.find(op => op.text === $op).method()
  }

  /**
   * @private 
   */
  static $awaitContinue() {
    console.log('\nPress any key to continue...')
    return new Promise(resolve => {
      process.stdin.setRawMode(true)
      process.stdin.resume()
      process.stdin.once('data', () => resolve(console.log('\n')))
    })
  }

  /**
   * @public
   */
  static async run() {
    while (true) {
      await this.$prompt()
      await this.$awaitContinue()
      clearConsole()
    }
  }

  /**
   * @public
   */
  static async browseInventory() {
    let depts = await DepartmentController.all()
    depts = new HashMap(depts)

    const $dept = await prompt({
      type: 'list',
      message: 'Select a department',
      choices: depts.$keys
    })

    const { products, name } = depts.get($dept)

    if (!products.length) {
      return console.log(`\nNo products in the ${name} department 😢`)
    }

    console.table(products.map(prod => prod.consumable))
  }

}

class Operation {

  constructor(text, method) {
    this.text = text
    this.method = method
  }

}
