import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Architecture, CfnAlias, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Table, BillingMode, AttributeType } from 'aws-cdk-lib/aws-dynamodb'
import path from 'path'

interface ITodoyStackProps extends StackProps {
  baseId: string
}

export class TodoyTasksStack extends Stack {
  public readonly apiLambdaArn: string

  constructor(scope: App, id: string, props: ITodoyStackProps) {
    super(scope, id, props)

    const baseId = props.baseId
    const stage = process.env.STAGE
    const environment = process.env.ENV

    //#region LAMBDA
    const lambda = new NodejsFunction(this, `${baseId}-Lambda-${environment}`, {
      functionName: `${baseId}-Lambda-${environment}`,
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/services/tasks/handler.ts')
    })

    const aliasVersion = stage === 'stage' ? lambda.currentVersion.version : '$LATEST'

    new CfnAlias(this, `${baseId}-Alias-${stage}`, {
      name: stage!,
      functionName: lambda.functionName,
      functionVersion: aliasVersion
    })

    this.apiLambdaArn = `${lambda.functionArn}:${stage}`
    //#endregion

    //#region DYNAMO DB
    const tasksTable = new Table(this, `${baseId}-Table-${environment}`, {
      tableName: `${baseId}-Table-${environment}`,
      partitionKey: { name: 'id', type: AttributeType.NUMBER },
      billingMode: BillingMode.PAY_PER_REQUEST
    })

    lambda.addEnvironment('TASKS_TABLE_NAME', tasksTable.tableName)

    tasksTable.grantFullAccess(lambda)
    //#endregion
  }
}
