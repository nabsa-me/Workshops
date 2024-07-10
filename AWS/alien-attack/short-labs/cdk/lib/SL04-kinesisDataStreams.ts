import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { AwsIntegration, EndpointType, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway'
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

    //#region DYNAMO DB
    const table = new TableV2(this, `${baseIDresource}-Table`, {
      partitionKey: { name: 'transactionId', type: AttributeType.STRING },
      tableName: `${baseIDresource}`
    });

    //#endregion

    //#region KINESIS STREAM
    const kinesisStream=new Stream(this,`${baseIDresource}-Stream`,{
      streamName:`${baseIDresource}-Stream`,
      streamMode: StreamMode.ON_DEMAND
    })

    //#endregion

    //#region IAM POLICIES AND ROLES
    const dynamoPolicy=new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:BatchWriteItem"],
      resources: [table.tableArn]
    })
    const kinesisPolicy=new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['kinesis:*'],
          resources: [kinesisStream.streamArn]
    })
    const generalLogsPolicy=new PolicyStatement({
        effect: Effect.ALLOW,
        // we will add later the LAMBDA and the API resources to that POLICY
        actions: [
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:DescribeLogGroups',
          'logs:DescribeLogStreams',
          'logs:PutLogEvents',
          'logs:GetLogEvents',
          'logs:FilterLogEvents'
        ]
    })

    const lambdaRole=new Role(this, `${baseIDresource}-LambdaRole`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: `${baseIDresource}-LambdaRole`,
      description: 'role for the lambda to manage kinesis data and write on dynamo db',
    })
    lambdaRole.addToPolicy(generalLogsPolicy)
    lambdaRole.addToPolicy(dynamoPolicy)
    lambdaRole.addToPolicy(kinesisPolicy)


    const apiRole=new Role(this, `${baseIDresource}-ApiRole`, {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      roleName: `${baseIDresource}-ApiRole`,
      description: 'role for the rest api to send kinesis events to lambda',
    })
    apiRole.addToPolicy(generalLogsPolicy)
    apiRole.addToPolicy(kinesisPolicy)

    //#endregion

    //#region LAMBDA
    const lambda = new NodejsFunction(this, `${baseIDresource}-Lambda`, {
      functionName: `${baseIDresource}-Lambda`,
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/SL04-lambda.ts'),
      role: lambdaRole,
      environment:{ 'tableName': table.tableName }
    })

    generalLogsPolicy.addResources(lambda.functionArn)

    lambda.addEventSource(new KinesisEventSource(kinesisStream, {
      batchSize:10,
      startingPosition:StartingPosition.LATEST
    }))

    //#endregion

    //#region REST API
    const api = new RestApi(this, `${baseIDresource}-API`, {
      restApiName: `${baseIDresource}-API`,
      description: 'api to fetch stored string parameters',
      endpointConfiguration: { types: [EndpointType.REGIONAL] }
    })

    api.root.addResource('putorder').addMethod('POST', new AwsIntegration({
      service: 'kinesis',
      region: this.region,
      integrationHttpMethod: 'POST',
      action:"PutRecord",
      options: {
        credentialsRole: apiRole,
        passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
        requestTemplates: {
          'application/json':
              `#set($inputPath = $input.path('$'))
              {
              "PartitionKey" : "$inputPath.User#$inputPath.Client#$inputPath.Order.Symbol#$inputPath.Order.Volume#$inputPath.Order.Price#$inputPath.Timestamp",
              "Data" : "$util.base64Encode("$input.json('$')")",
              "StreamName" : ${kinesisStream.streamName}
              }`
        },
        integrationResponses: [
          {
            statusCode: '200'
          }
        ]
      }
    }),)
    
    generalLogsPolicy.addResources(api.arnForExecuteApi('POST', '/putorder'))

    //#endregion
  }
}
