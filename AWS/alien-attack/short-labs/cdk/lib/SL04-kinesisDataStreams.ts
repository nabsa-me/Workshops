import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { EndpointType, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
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

    //#region IAM ROLE
    // const ssmRole = new Role(this, 'WS-AlienAttack-Lab01-Role', {
    //   assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
    //   roleName: 'WS-AlienAttack-Lab01-Role',
    //   description: 'role that will be counsumed by the api'
    // })

    // ssmRole.addToPolicy(
    //   new PolicyStatement({
    //     effect: Effect.ALLOW,
    //     resources: ['*'],
    //     actions: [
    //       'logs:CreateLogGroup',
    //       'logs:CreateLogStream',
    //       'logs:DescribeLogGroups',
    //       'logs:DescribeLogStreams',
    //       'logs:PutLogEvents',
    //       'logs:GetLogEvents',
    //       'logs:FilterLogEvents'
    //     ]
    //   })
    // )
    // ssmRole.attachInlinePolicy(
    //   new Policy(this, 'WS-AlienAttack-Lab01-Policy', {
    //     policyName: 'WS-AlienAttack-Lab01-Policy',
    //     statements: [
    //       new PolicyStatement({
    //         effect: Effect.ALLOW,
    //         actions: ['ssm:GetParameter'],
    //         resources: [`${arnParameter}`]
    //       })
    //     ]
    //   })
    // )

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

    api.root.addResource('putorder').addMethod('POST', new LambdaIntegration(lambda))

    //#endregion
  }
}
