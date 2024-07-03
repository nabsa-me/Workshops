import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { AwsIntegration, EndpointType, LambdaIntegration, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import * as kinesis from 'aws-cdk-lib/aws-kinesis'
// import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Architecture, Runtime, StartingPosition } from 'aws-cdk-lib/aws-lambda'
import { KinesisEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
// import { ParameterDataType, ParameterTier, StringParameter } from 'aws-cdk-lib/aws-ssm'
import path from 'path'


export class kinesisDataStreamsStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion
    const baseIDresource = 'WS-AlienAttack-Lab04'

    //#region STRING PARAMETER
    // const stringParameter = new StringParameter(this, 'WS-AlienAttack-Lab01-StringParameter', {
    //   stringValue: '{"url" : "https://www.amazon.com"}',
    //   description: 'string parameter will be consumed by the api',
    //   parameterName: '/WS/Alien-Attack/Short-Lab-01/configuration',
    //   tier: ParameterTier.STANDARD,
    //   dataType: ParameterDataType.TEXT
    // })
    // const arnParameter = stringParameter.parameterArn

    //#endregion

    //#region KINESIS ROLE
    const kinesisRole = new Role(this, `${baseIDresource}-Role`, {
      assumedBy: new ServicePrincipal('kinesis.amazonaws.com'),
      roleName: `${baseIDresource}-Lambda`,
      description: 'role that will be counsumed by the api'
    })

    kinesisRole.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ['*'],
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
    )
    kinesisRole.attachInlinePolicy(
      new Policy(this, `${baseIDresource}-Policy`, {
        policyName: `${baseIDresource}-Policy`,
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['kinesis:PutRecord'],
            resources: ['*']
          })
        ]
      })
    )

    //#endregion

    //#region LAMBDA
    const lambda = new NodejsFunction(this, `${baseIDresource}-Lambda`, {
      functionName: `${baseIDresource}-Lambda`,
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/SL04-lambda.ts')
    })
    const stream = new kinesis.Stream(this,`${baseIDresource}-KinesisStream`,{streamName:`${baseIDresource}-KinesisStream`,shardCount:1})

    lambda.addEventSource(new KinesisEventSource(stream, {
      batchSize:10,
      startingPosition:StartingPosition.TRIM_HORIZON
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
        credentialsRole: kinesisRole,
        passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
        
//         requestParameters: {
//           'integration.request.header.X-Amz-Target': "'AmazonSSM.GetParameter'",
//           'integration.request.header.Content-Type': "'application/x-amz-json-1.1'"
//         },
//         cacheKeyParameters: ['integration.request.header.X-Amz-Target', 'integration.request.header.Content-Type'],
//         requestTemplates: {
//           'application/json': JSON.stringify({
//             Name: "/WS/Alien-Attack/$input.params('lab')/configuration"
//           })
//         },
//         integrationResponses: [
//           {
//             statusCode: '200',
//             responseTemplates: {
//               'application/json': `#set($inputRoot=$input.path('$'))
// #if ($inputRoot.Parameter.Value && $inputRoot.Parameter.Value!="")
// {
// "data" : $input.path('$').Parameter.Value
// }
// #end`
//             }
//           }
//         ]
      }
    }),)

    //#endregion
  }
}
