import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Alias, Architecture, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import path from 'path'

interface ITodoyStackProps extends StackProps {
  baseId: string
}

export class TodoyTasksStack extends Stack {
  public readonly apiLambda: IFunction

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

    let version
    if (stage === 'stage') {
      version = lambda.currentVersion

      new Alias(this, `${baseId}-Alias-${stage}`, {
        aliasName: 'stage',
        version
      })
    }

    this.apiLambda = lambda
  }
}
