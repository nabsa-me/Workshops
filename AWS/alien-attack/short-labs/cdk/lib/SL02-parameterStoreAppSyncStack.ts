import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import {
  AuthorizationType,
  CfnDataSource,
  CfnResolver,
  Definition,
  GraphqlApi,
  SchemaFile
} from 'aws-cdk-lib/aws-appsync'
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { ParameterDataType, StringParameter } from 'aws-cdk-lib/aws-ssm'
import path from 'path'
import { baseParameterName, requestTemplate, responseTemplate } from '../../src/SL02-resolvers'

export class parameterStoreAppSyncStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion

    const baseIDresource = 'WS-AlienAttack-Lab02'
    const logsPolicy = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'

    //#region STRING PARAMETERS
    new StringParameter(this, `${baseIDresource}-SSM_ClientID`, {
      stringValue: 'abcd01',
      description: 'application client ID',
      parameterName: `${baseParameterName}/clientid`,
      dataType: ParameterDataType.TEXT
    })

    new StringParameter(this, `${baseIDresource}-SSM_Url`, {
      stringValue: 'shortlab.alienattack.nabsa.me',
      description: 'The system URL',
      parameterName: `${baseParameterName}/url`,
      dataType: ParameterDataType.TEXT
    })

    new StringParameter(this, `${baseIDresource}-SSM_Review`, {
      stringValue: 'null',
      description: 'Date of the latest well-architected review',
      parameterName: `${baseParameterName}/latestReview`,
      dataType: ParameterDataType.TEXT
    })

    new StringParameter(this, `${baseIDresource}-SSM_Periodicity`, {
      stringValue: '90',
      description: 'Periodicity of WARs',
      parameterName: `${baseParameterName}/reviewPeriodicityInDays`,
      dataType: ParameterDataType.TEXT
    })

    //#endregion

    //#region IAM ROLE
    const ssmRole = new Role(this, `${baseIDresource}-Role`, {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      roleName: `${baseIDresource}-Role`,
      description: 'permissions for the Appsync API'
    })

    ssmRole.addManagedPolicy({ managedPolicyArn: logsPolicy })

    ssmRole.attachInlinePolicy(
      new Policy(this, `${baseIDresource}-Policy`, {
        policyName: `${baseIDresource}-Policy`,
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['ssm:GetParametersByPath'],
            resources: [`arn:aws:ssm:${this.region}:${this.account}:parameter${baseParameterName}/*`]
          })
        ]
      })
    )

    //#endregion

    //#region GRAPHQL API
    const schema = new SchemaFile({ filePath: path.join(__dirname, '../../src/SL02-schema.graphql') })
    const api = new GraphqlApi(this, `${baseIDresource}-API`, {
      name: `${baseIDresource}-API`,
      definition: Definition.fromSchema(schema)
    })

    const dataSource = new CfnDataSource(this, `${baseIDresource}-DataSource`, {
      apiId: api.apiId,
      name: 'ssm_dataSource',
      type: 'HTTP',
      serviceRoleArn: ssmRole.roleArn,
      httpConfig: {
        endpoint: `https://ssm.${this.region}.amazonaws.com/`,
        authorizationConfig: {
          authorizationType: AuthorizationType.IAM,
          awsIamConfig: { signingRegion: this.region, signingServiceName: 'ssm' }
        }
      }
    })

    new CfnResolver(this, `${baseIDresource}-Resolver`, {
      apiId: api.apiId,
      fieldName: 'getSystemSettings',
      typeName: 'Query',
      dataSourceName: dataSource.name,
      requestMappingTemplate: requestTemplate,
      responseMappingTemplate: responseTemplate
    })

    //#endregion
  }
}
