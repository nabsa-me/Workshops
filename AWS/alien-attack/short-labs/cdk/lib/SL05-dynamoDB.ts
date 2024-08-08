import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { AttributeType, TableV2 } from 'aws-cdk-lib/aws-dynamodb'
import { Effect, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import path from 'path'

export class dynamoDBStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion

    const baseIDresource = 'WS-AlienAttack-Lab05'
    const logsPolicy = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'

    //#region DYNAMO DB
    const table = new TableV2(this, `${baseIDresource}-Table`, {
      partitionKey: { name: 'Id', type: AttributeType.STRING },
      tableName: `${baseIDresource}-Table`
    })

    //#endregion

    //#region IAM POLICIES AND ROLES
    //resources policies
    const dynamoPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:*'],
      resources: [table.tableArn]
    })

    //role for the LAMBDA
    const lambdaRole = new Role(this, `${baseIDresource}-Role`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: `${baseIDresource}-Role`,
      description: 'role for the lambda to manage kinesis data and write on dynamo db'
    })

    lambdaRole.addToPolicy(dynamoPolicy)
    lambdaRole.addManagedPolicy({ managedPolicyArn: logsPolicy })

    //#region LAMBDA
    new NodejsFunction(this, `${baseIDresource}-Lambda`, {
      functionName: `${baseIDresource}-Lambda`,
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/SL05-lambda.ts'),
      role: lambdaRole,
      environment: { tableName: table.tableName }
    })

    //#endregion
  }
}
