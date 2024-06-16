import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { ParameterDataType, StringParameter } from 'aws-cdk-lib/aws-ssm'
import path from 'path'

export class parameterStoreLambdaStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion
    const baseIDresource = 'WS-AlienAttack-Lab03'
    //#region STRING PARAMETER
    new StringParameter(this, `${baseIDresource}-StringParameter`, {
      stringValue: '{"url" : "https://www.nabsa.me"}',
      description: 'string parameter will be consumed by the api',
      parameterName: '/WS/Alien-Attack/Short-Lab-03/configuration',
      dataType: ParameterDataType.TEXT
    })

    //#endregion

    //#region IAM ROLE
    const lambdaRole = new Role(this, `${baseIDresource}-Role`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: `${baseIDresource}-Role`,
      description: 'role that will be counsumed by the lambda'
    })

    lambdaRole.addToPolicy(
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
    lambdaRole.attachInlinePolicy(
      new Policy(this, `${baseIDresource}-Policy`, {
        policyName: `${baseIDresource}-Policy`,
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['ssm:GetParameter'],
            resources: [`arn:aws:ssm:${this.region}:${this.account}:parameter/WS/Alien-Attack/*/configuration`]
          })
        ]
      })
    )

    //#endregion

    //#region LAMBDA
    new NodejsFunction(this, `${baseIDresource}-Lambda`, {
      functionName: `${baseIDresource}-Lambda`,
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/SL03-lambda.ts'),
      role: lambdaRole
    })

    //#endregion
  }
}
