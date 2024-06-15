import { App } from 'aws-cdk-lib'
import { parameterStoreStack } from '../lib/SL01-parameterStoreStack'
import { parameterStoreAppSyncStack } from '../lib/SL02-parameterStoreAppSyncStack'

const app = new App()

new parameterStoreStack(app, 'WS-AlienAttack-Lab01-Stack', {
  description: 'Stack for the creation of Alien Attack - Parameter Store API with API Gateway resources',
  stackName: 'WS-AlienAttack-Lab01-Stack'
})
new parameterStoreAppSyncStack(app, 'WS-AlienAttack-Lab02-Stack', {
  description: 'Stack for the creation of Alien Attack - Parameter Store API with AppSync resources',
  stackName: 'WS-AlienAttack-Lab02-Stack'
})
