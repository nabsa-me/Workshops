import { App } from 'aws-cdk-lib'
import { parameterStoreStack } from '../lib/parameterStoreStack'

const app = new App()

new parameterStoreStack(app, 'WS-AlienAttack-Lab01-Stack', {
  description: 'Stack for the creation of Alien Attack Short Lab 01 resources',
  stackName: 'WS-AlienAttack-Lab01-Stack'
})
