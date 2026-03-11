import { App, CustomResource, Duration, RemovalPolicy, SecretValue, Stack, StackProps } from 'aws-cdk-lib'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import {
  AuroraCapacityUnit,
  AuroraPostgresEngineVersion,
  Credentials,
  DatabaseClusterEngine,
  ServerlessCluster
} from 'aws-cdk-lib/aws-rds'
import { Provider } from 'aws-cdk-lib/custom-resources'
import path from 'path'

interface ITodoyStackProps extends StackProps {
  baseId: string
}

export class TodoyDBStack extends Stack {
  constructor(scope: App, id: string, props: ITodoyStackProps) {
    super(scope, id, props)

    const baseId = props.baseId
    const environment = process.env.ENV
    const dbUser = process.env.AWS_DB_USER!
    const dbPassword = process.env.AWS_DB_PASSWORD!

    const auroraCluster = new ServerlessCluster(this, `${baseId}-AuroraCluster-${environment}`, {
      clusterIdentifier: `${baseId}-AuroraCluster-${environment}`,
      engine: DatabaseClusterEngine.auroraPostgres({ version: AuroraPostgresEngineVersion.VER_13_23 }),
      defaultDatabaseName: `${baseId}-${environment}`,
      enableDataApi: false,
      credentials: Credentials.fromPassword(dbUser, SecretValue.unsafePlainText(dbPassword)),
      scaling: {
        autoPause: Duration.minutes(10),
        minCapacity: AuroraCapacityUnit.ACU_1,
        maxCapacity: AuroraCapacityUnit.ACU_2
      },
      removalPolicy: RemovalPolicy.DESTROY
    })

    const initTablesLambda = new NodejsFunction(this, `${baseId}-Lambda-${environment}`, {
      functionName: `${baseId}-Lambda-${environment}`,
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, './helpers/auroraInitTablesHandler.ts'),
      environment: {
        DB_HOST: auroraCluster.clusterEndpoint.hostname,
        DB_PORT: auroraCluster.clusterEndpoint.port.toString(),
        DB_NAME: `${baseId}-${environment}`,
        DB_USER: dbUser,
        DB_PASSWORD: dbPassword
      }
    })

    initTablesLambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['rds:*', 'rds-db:connect'],
        resources: ['*']
      })
    )

    const provider = new Provider(this, `${baseId}-Provider-${environment}`, {
      onEventHandler: initTablesLambda
    })

    new CustomResource(this, `${baseId}-CustomResource-${environment}`, {
      serviceToken: provider.serviceToken
    })
  }
}
