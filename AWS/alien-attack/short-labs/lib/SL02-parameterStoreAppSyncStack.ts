import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { Definition, GraphqlApi, SchemaFile } from 'aws-cdk-lib/aws-appsync'
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { ParameterDataType, StringParameter } from 'aws-cdk-lib/aws-ssm'
import path from 'path'

export class parameterStoreAppSyncStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion

    //#region STRING PARAMETERS
    const baseParameterName = '/WS/Alien-Attack/Short-Lab-02/'

    /*const SSMClientID = */ new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_ClientID', {
      stringValue: 'abcd01',
      description: 'application client ID',
      parameterName: `${baseParameterName}clientid`,
      dataType: ParameterDataType.TEXT
    })

    /*const SSMUrl = */ new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_Url', {
      stringValue: 'shortlab.alienattack.nabsa.me',
      description: 'The system URL',
      parameterName: `${baseParameterName}url`,
      dataType: ParameterDataType.TEXT
    })
    /*const SSMReview = */ new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_Review', {
      stringValue: 'null',
      description: 'Date of the latest well-architected review',
      parameterName: `${baseParameterName}latestReview`,
      dataType: ParameterDataType.TEXT
    })
    /*const SSMPeriodicity = */ new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_Periodicity', {
      stringValue: '90',
      description: 'Periodicity of WARs',
      parameterName: `${baseParameterName}reviewPeriodicityInDays`,
      dataType: ParameterDataType.TEXT
    })

    //#endregion

    //#region GRAPHQL API
    const schema = new SchemaFile({ filePath: path.join(__dirname, '../src/SL02-schema.graphql') })
    new GraphqlApi(this, 'WS-AlienAttack-Lab02-API', {
      name: 'WS-AlienAttack-Lab02-API',
      definition: Definition.fromSchema(schema)
    })

    //#endregion

    //#region IAM ROLE
    const ssmRole = new Role(this, 'WS-AlienAttack-Lab02-Role', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      roleName: 'WS-AlienAttack-Lab02-Role',
      description: 'permissions for the Appsync API'
    })

    ssmRole.addToPolicy(
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
    ssmRole.attachInlinePolicy(
      new Policy(this, 'WS-AlienAttack-Lab02-Policy', {
        policyName: 'WS-AlienAttack-Lab02-Policy',
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['ssm:GetParameterByPath'],
            resources: [`arn:aws:ssm:${this.region}:${this.account}:parameter${baseParameterName}`]
          })
        ]
      })
    )

    //#endregion
  }
}
