import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import { AwsIntegration, EndpointType, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { PassthroughBehavior } from 'aws-cdk-lib/aws-apigatewayv2'
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { ParameterDataType, ParameterTier, StringParameter } from 'aws-cdk-lib/aws-ssm'

export class parameterStoreApiGatewayStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion

    //#region STRING PARAMETER
    const stringParameter = new StringParameter(this, 'WS-AlienAttack-Lab01-StringParameter', {
      stringValue: '{"url" : "https://www.amazon.com"}',
      description: 'string parameter will be consumed by the api',
      parameterName: '/WS/Alien-Attack/Short-Lab-01/configuration',
      tier: ParameterTier.STANDARD,
      dataType: ParameterDataType.TEXT
    })
    const arnParameter = stringParameter.parameterArn

    //#endregion

    //#region IAM ROLE
    const ssmRole = new Role(this, 'WS-AlienAttack-Lab01-Role', {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      roleName: 'WS-AlienAttack-Lab01-Role',
      description: 'role that will be counsumed by the api'
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
      new Policy(this, 'WS-AlienAttack-Lab01-Policy', {
        policyName: 'WS-AlienAttack-Lab01-Policy',
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['ssm:GetParameter'],
            resources: [`${arnParameter}`]
          })
        ]
      })
    )

    //#endregion

    //#region REST API
    const api = new RestApi(this, 'WS-AlienAttack-Lab01-API', {
      restApiName: 'WS-AlienAttack-Lab01-API',
      description: 'api to fetch stored string parameters',
      endpointConfiguration: { types: [EndpointType.REGIONAL] }
    })

    api.root.addResource('getconfig').addMethod(
      'GET',
      new AwsIntegration({
        service: 'ssm',
        region: this.region,
        integrationHttpMethod: 'POST',
        path: '/',
        options: {
          credentialsRole: ssmRole,
          passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
          requestParameters: {
            'integration.request.header.X-Amz-Target': "'AmazonSSM.GetParameter'",
            'integration.request.header.Content-Type': "'application/x-amz-json-1.1'"
          },
          cacheKeyParameters: ['integration.request.header.X-Amz-Target', 'integration.request.header.Content-Type'],
          requestTemplates: {
            'application/json': JSON.stringify({
              Name: "/WS/Alien-Attack/$input.params('lab')/configuration"
            })
          },
          integrationResponses: [
            {
              statusCode: '200',
              responseTemplates: {
                'application/json': `#set($inputRoot=$input.path('$'))
#if ($inputRoot.Parameter.Value && $inputRoot.Parameter.Value!="")
{
  "data" : $input.path('$').Parameter.Value
}
#end`
              }
            }
          ]
        }
      }),
      {
        methodResponses: [
          {
            statusCode: '200'
          }
        ]
      }
    )

    //#endregion
  }
}