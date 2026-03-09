import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Architecture, CfnAlias, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
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

    const lambda = new NodejsFunction(this, `${baseId}-Lambda-${environment}`, {
      functionName: `${baseId}-Lambda-${environment}`,
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/tasksHandler.ts'),
      environment: { env: environment || 'dev' }
    })

    const aliasVersion = stage === 'stage' ? lambda.currentVersion.version : '$LATEST'

    new CfnAlias(this, `${baseId}-Alias-${stage}`, {
      name: stage!,
      functionName: lambda.functionName,
      functionVersion: aliasVersion
    })

    this.apiLambdaArn = `${lambda.functionArn}:${stage}`
  }
}
