import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { AwsIntegration, EndpointType, Model, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { AttributeType, TableV2 } from 'aws-cdk-lib/aws-dynamodb'
import { Effect, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Stream, StreamMode } from 'aws-cdk-lib/aws-kinesis'
import { Architecture, Runtime, StartingPosition } from 'aws-cdk-lib/aws-lambda'
import { KinesisEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import path from 'path'

export class kinesisDataStreamsStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion

    const baseIDresource = 'WS-AlienAttack-Lab04'
    const logsPolicy = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'

    //#region DYNAMO DB
    const table = new TableV2(this, `${baseIDresource}-Table`, {
      partitionKey: { name: 'TransactionId', type: AttributeType.STRING },
      tableName: `${baseIDresource}-Table`
    })

    //#endregion

    //#region KINESIS STREAM
    const kinesisStream = new Stream(this, `${baseIDresource}-Stream`, {
      streamName: `${baseIDresource}-Stream`,
      streamMode: StreamMode.ON_DEMAND
    })

    //#endregion

    //#region IAM POLICIES AND ROLES
    //resources policies
    const dynamoPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:BatchWriteItem'],
      resources: [table.tableArn]
    })
    const kinesisPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['kinesis:*'],
      resources: [kinesisStream.streamArn]
    })

    //role for the LAMBDA
    const lambdaRole = new Role(this, `${baseIDresource}-Role`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: `${baseIDresource}-Role`,
      description: 'role for the lambda to manage kinesis data and write on dynamo db'
    })
    lambdaRole.addToPolicy(dynamoPolicy)
    lambdaRole.addToPolicy(kinesisPolicy)
    lambdaRole.addManagedPolicy({ managedPolicyArn: logsPolicy })

    //role for the API
    const apiRole = new Role(this, `${baseIDresource}-ApiRole`, {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      roleName: `${baseIDresource}-ApiRole`,
      description: 'role for the rest api to send kinesis events to lambda'
    })
    apiRole.addToPolicy(kinesisPolicy)
    apiRole.addManagedPolicy({ managedPolicyArn: logsPolicy })

    //#endregion

    //#region LAMBDA
    const lambda = new NodejsFunction(this, `${baseIDresource}-Lambda`, {
      functionName: `${baseIDresource}-Lambda`,
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/SL04-lambda.ts'),
      role: lambdaRole,
      environment: { tableName: table.tableName }
    })
    lambda.addEventSource(
      new KinesisEventSource(kinesisStream, {
        batchSize: 10,
        startingPosition: StartingPosition.TRIM_HORIZON
      })
    )

    //#endregion

    //#region REST API
    const api = new RestApi(this, `${baseIDresource}-API`, {
      restApiName: `${baseIDresource}-API`,
      description: 'api to send data to kinesis streams',
      endpointConfiguration: { types: [EndpointType.REGIONAL] }
    })

    const putOrders = api.root.addResource('putorder').addMethod(
      'POST',
      new AwsIntegration({
        service: 'kinesis',
        region: this.region,
        integrationHttpMethod: 'POST',
        action: 'PutRecord',
        options: {
          credentialsRole: apiRole,
          passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
          requestTemplates: {
            'application/json': `#set($inputPath = $input.path('$'))
{
"PartitionKey" : "$inputPath.User#$inputPath.Client#$inputPath.Order.Symbol#$inputPath.Order.Volume#$inputPath.Order.Price#$inputPath.Timestamp",
"Data" : "$util.base64Encode("$input.json('$')")",
"StreamName" : "${kinesisStream.streamName}"
}`
          },
          integrationResponses: [
            {
              statusCode: '200',
              responseTemplates: {
                'application/json': ''
              }
            }
          ]
        }
      })
    )
    putOrders.addMethodResponse({ statusCode: '200', responseModels: { 'application/json': Model.EMPTY_MODEL } })

    //#endregion
  }
}
