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

    const baseIDresource = 'WS-AlienAttack-Lab01'
    const logsPolicy = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'

    //#region STRING PARAMETER
    const stringParameter = new StringParameter(this, `${baseIDresource}-StringParameter`, {
      stringValue: '{"url" : "https://www.amazon.com"}',
      description: 'string parameter will be consumed by the api',
      parameterName: '/WS/Alien-Attack/Short-Lab-01/configuration',
      tier: ParameterTier.STANDARD,
      dataType: ParameterDataType.TEXT
    })
    const arnParameter = stringParameter.parameterArn

    //#endregion

    //#region IAM ROLE
    const ssmRole = new Role(this, `${baseIDresource}-Role`, {
      assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      roleName: `${baseIDresource}-Role`,
      description: 'role that will be counsumed by the api'
    })

    ssmRole.addManagedPolicy({ managedPolicyArn: logsPolicy })

    ssmRole.attachInlinePolicy(
      new Policy(this, `${baseIDresource}-Policy`, {
        policyName: `${baseIDresource}-Policy`,
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
    const api = new RestApi(this, `${baseIDresource}-API`, {
      restApiName: `${baseIDresource}-API`,
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
