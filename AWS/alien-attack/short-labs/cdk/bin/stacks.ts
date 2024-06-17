import { App } from 'aws-cdk-lib'
import { parameterStoreApiGatewayStack } from '../lib/SL01-parameterStoreApiGatewayStack'
import { parameterStoreAppSyncStack } from '../lib/SL02-parameterStoreAppSyncStack'
import { parameterStoreLambdaStack } from '../lib/SL03-parameterStoreLambdaStack'
import { kinesisDataStreamsStack } from '../lib/SL04-kinesisDataStreams'

const app = new App()

new parameterStoreApiGatewayStack(app, 'WS-AlienAttack-Lab01-Stack', {
  description: 'Stack for the creation of Alien Attack - Parameter Store API with API Gateway resources',
  stackName: 'WS-AlienAttack-Lab01-Stack'
})
new parameterStoreAppSyncStack(app, 'WS-AlienAttack-Lab02-Stack', {
  description: 'Stack for the creation of Alien Attack - Parameter Store API with AppSync resources',
  stackName: 'WS-AlienAttack-Lab02-Stack'
})
new parameterStoreLambdaStack(app, 'WS-AlienAttack-Lab03-Stack', {
  description: 'Stack for the creation of Alien Attack - Parameter Store API with Lambda resources',
  stackName: 'WS-AlienAttack-Lab03-Stack'
})
new kinesisDataStreamsStack(app, 'WS-AlienAttack-Lab04-Stack', {
  description: 'Stack for the creation of Alien Attack - Data with Kinesis Data Streams resources',
  stackName: 'WS-AlienAttack-Lab04-Stack'
})
