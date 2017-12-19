import './config/process'
import './config/db'

import 'console.table'

import { transaction } from 'objection'

import { AdminClient, CustomerClient, SupervisorClient } from './clients'
import { clearConsole, prompt, HashMap } from './utils'
import { ProductController } from './controllers';

async function main() {
  const clientMap = new HashMap([
    { name: 'Administrator', client: AdminClient },
    { name: 'Supervisor', client: SupervisorClient },
    { name: 'Customer', client: CustomerClient }
  ])

  const clientType = await prompt({
    type: 'list',
    message: 'Please select a client to launch',
    choices: clientMap.$keys
  })

  clearConsole()
  clientMap.get(clientType).client.run()
}

main()
