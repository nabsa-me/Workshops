import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { CfnDataSource, Definition, GraphqlApi, Resolver, SchemaFile } from 'aws-cdk-lib/aws-appsync'
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

    new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_ClientID', {
      stringValue: 'abcd01',
      description: 'application client ID',
      parameterName: `${baseParameterName}clientid`,
      dataType: ParameterDataType.TEXT
    })

    new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_Url', {
      stringValue: 'shortlab.alienattack.nabsa.me',
      description: 'The system URL',
      parameterName: `${baseParameterName}url`,
      dataType: ParameterDataType.TEXT
    })
    new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_Review', {
      stringValue: 'null',
      description: 'Date of the latest well-architected review',
      parameterName: `${baseParameterName}latestReview`,
      dataType: ParameterDataType.TEXT
    })
    new StringParameter(this, 'WS-AlienAttack-Lab02-SSM_Periodicity', {
      stringValue: '90',
      description: 'Periodicity of WARs',
      parameterName: `${baseParameterName}reviewPeriodicityInDays`,
      dataType: ParameterDataType.TEXT
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
            actions: ['ssm:GetParametersByPath'],
            resources: [`arn:aws:ssm:${this.region}:${this.account}:parameter${baseParameterName}`]
          })
        ]
      })
    )

    //#endregion

    //#region GRAPHQL API
    const schema = new SchemaFile({ filePath: path.join(__dirname, '../src/SL02-schema.graphql') })
    const api = new GraphqlApi(this, 'WS-AlienAttack-Lab02-API', {
      name: 'WS-AlienAttack-Lab02-API',
      definition: Definition.fromSchema(schema)
    })

    const data = new CfnDataSource(this, 'WS-AlienAttack-Lab02-DataSource', {
      apiId: api.apiId,
      name: 'ssm_dataSource',
      type: 'HTTP',
      serviceRoleArn: ssmRole.roleArn,
      httpConfig: {
        endpoint: `https://ssm.${this.region}.amazonaws.com/`,
        authorizationConfig: {
          authorizationType: 'AWS_IAM',
          awsIamConfig: { signingRegion: this.region, signingServiceName: 'ssm' }
        }
      }
    })
    api.addHttpDataSource('dataSource', `https://ssm.${this.region}.amazonaws.com/`, data)

    //     new Resolver(this, 'WS-AlienAttack-Lab02-Resolver', {
    //       api: api,
    //       fieldName: 'getSystemSettings(...): SystemSettings',
    //       typeName: 'Unit Resolver (VTL only)',
    //       // dataSource: api.addHttpDataSource('data', `https://ssm.${this.region}.amazonaws.com/`, dataSource),
    //       requestMappingTemplate: {
    //         renderTemplate: () => `#set( $ssmRequestBody =
    //     {
    //     "Path":  "/systems/$context.args.systemName",
    //     "Recursive" : true
    //     }
    // )
    // {
    //     "version": "2018-05-29",
    //     "method": "POST",
    //     "resourcePath": "/",
    //     "params":{
    //         "headers": {
    //             "X-Amz-Target" : "AmazonSSM.GetParametersByPath",
    //             "Content-Type" :     "application/x-amz-json-1.1"
    //         },
    //         "body" : $util.toJson($ssmRequestBody)
    //     }
    // }`
    //       },
    //       responseMappingTemplate: {
    //         renderTemplate: () => `#if($ctx.error)
    //     $util.error($ctx.error.message, $ctx.error.type)
    // #end
    // #if($ctx.result.statusCode == 200)
    //     #set( $body = $util.parseJson($ctx.result.body) )
    //     #set($arrayOfParameters = [])
    //     #foreach( $item in $body.Parameters )
    //         $util.qr( $arrayOfParameters.add( { "Name" : $item.Name, "Value" : $item.Value } ) )
    //     #end
    //     $util.toJson( { "SystemName" : $ctx.arguments.systemName , "Parameters" : $arrayOfParameters }  )
    // #else
    //     $util.toJson($ctx.error)
    //     $utils.appendError($ctx.result.body, "$ctx.result.statusCode")
    // #end`
    //       }
    //     })

    //#endregion
  }
}
