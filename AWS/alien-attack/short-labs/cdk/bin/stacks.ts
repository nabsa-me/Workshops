import { App } from 'aws-cdk-lib'
import { parameterStoreApiGatewayStack } from '../lib/SL01-parameterStoreApiGatewayStack'
import { parameterStoreAppSyncStack } from '../lib/SL02-parameterStoreAppSyncStack'
import { parameterStoreLambdaStack } from '../lib/SL03-parameterStoreLambdaStack'
// import { kinesisDataStreamsStack } from '../lib/SL04-kinesisDataStreams'
import { dynamoDBStack } from '../lib/SL05-dynamoDB'
import { microserviceStack } from '../lib/SL06-microservice'
import { apiLambdaAuthorizerStack } from '../lib/SL07-apiLambdaAuth'

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

// This stack consumes paid resources, so it is disabled

// new kinesisDataStreamsStack(app, 'WS-AlienAttack-Lab04-Stack', {
//   description: 'Stack for the creation of Alien Attack - Data with Kinesis Data Streams resources',
//   stackName: 'WS-AlienAttack-Lab04-Stack'
// })

new dynamoDBStack(app, 'WS-AlienAttack-Lab05-Stack', {
  description: 'Stack for the creation of Alien Attack - DynamoDB resources',
  stackName: 'WS-AlienAttack-Lab05-Stack'
})
new microserviceStack(app, 'WS-AlienAttack-Lab06-Stack', {
  description: 'Stack for the creation of Alien Attack - Microservice resources',
  stackName: 'WS-AlienAttack-Lab06-Stack'
})
new apiLambdaAuthorizerStack(app, 'WS-AlienAttack-Lab07-Stack', {
  description: 'Stack for the creation of Alien Attack - Lambda and Api with Authorization',
  stackName: 'WS-AlienAttack-Lab07-Stack'
})
