import { App, Stack, StackProps, Tags } from 'aws-cdk-lib'
import {
  ApiKey,
  ApiKeySourceType,
  Cors,
  EndpointType,
  LambdaIntegration,
  PassthroughBehavior,
  RestApi,
  UsagePlan
} from 'aws-cdk-lib/aws-apigateway'
import { AttributeType, TableV2 } from 'aws-cdk-lib/aws-dynamodb'
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import path from 'path'

export class microserviceStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props)

    //#region TAGS
    Tags.of(this).add('Name', this.stackName)
    Tags.of(this).add('Project', 'Workshops')

    //#endregion

    const baseIDresource = 'WS-AlienAttack-Lab06'

    //#region DYNAMO DB
    const table = new TableV2(this, `${baseIDresource}-Table`, {
      partitionKey: { name: 'SessionId', type: AttributeType.STRING },
      tableName: `${baseIDresource}-Table`
    })

    //#endregion

    //#region IAM POLICIES AND ROLES
    const logsPolicy = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'

    const lambdaRole = new Role(this, `${baseIDresource}-Role`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: `${baseIDresource}-Role`,
      description: 'role for the lambda to manage microservices resources'
    })

    lambdaRole.attachInlinePolicy(
      new Policy(this, `${baseIDresource}-Policy`, {
        policyName: `${baseIDresource}-Policy`,
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['dynamodb:*'],
            resources: [table.tableArn]
          })
        ]
      })
    )

    lambdaRole.addManagedPolicy({ managedPolicyArn: logsPolicy })

    //#region LAMBDA
    const lambda = new NodejsFunction(this, `${baseIDresource}-Lambda`, {
      functionName: `${baseIDresource}-Lambda`,
      runtime: Runtime.NODEJS_18_X,
      architecture: Architecture.ARM_64,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/SL06-lambda.ts'),
      role: lambdaRole,
      environment: { TABLENAME: table.tableName }
    })

    //#endregion

    //#region REST API
    const api = new RestApi(this, `${baseIDresource}-API`, {
      restApiName: `${baseIDresource}-API`,
      description: 'api to reach and consume lambda function',
      endpointConfiguration: { types: [EndpointType.EDGE] },
      defaultCorsPreflightOptions: { allowOrigins: Cors.ALL_ORIGINS, allowMethods: Cors.ALL_METHODS },
      apiKeySourceType: ApiKeySourceType.AUTHORIZER
    })

    const apiKey = new ApiKey(this, `${baseIDresource}-APIKey`, {
      apiKeyName: `${baseIDresource}-APIKey`,
      description: 'apiKey created for the api'
    })

    const usagePlan = new UsagePlan(this, `${baseIDresource}-UsagePlan`, {
      name: `${baseIDresource}-UsagePlan`,
      description: 'usage plan for de api apiKey',
      apiStages: [
        {
          api: api,
          stage: api.deploymentStage
        }
      ]
    })

    usagePlan.addApiKey(apiKey)

    api.root.addResource('topxstatistics').addMethod(
      'GET',
      new LambdaIntegration(lambda, {
        requestParameters: {
          // 'method.request.querystring.sessionId': 'sessionId',
          'integration.request.querystring.sessionId': 'method.request.querystring.sessionId'
        },
        passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
        requestTemplates: {
          'application/json': `##  See https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
##  This template will pass through all parameters including path, querystring, header, stage variables, and context through to the integration endpoint via the body/payload
#set($allParams = $input.params())
{
"body-json" : $input.json('$'),
"params" : {
#foreach($type in $allParams.keySet())
    #set($params = $allParams.get($type))
"$type" : {
    #foreach($paramName in $params.keySet())
    "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
        #if($foreach.hasNext),#end
    #end
}
    #if($foreach.hasNext),#end
#end
},
"stage-variables" : {
#foreach($key in $stageVariables.keySet())
"$key" : "$util.escapeJavaScript($stageVariables.get($key))"
    #if($foreach.hasNext),#end
#end
},
"context" : {
    "account-id" : "$context.identity.accountId",
    "api-id" : "$context.apiId",
    "api-key" : "$context.identity.apiKey",
    "authorizer-principal-id" : "$context.authorizer.principalId",
    "caller" : "$context.identity.caller",
    "cognito-authentication-provider" : "$context.identity.cognitoAuthenticationProvider",
    "cognito-authentication-type" : "$context.identity.cognitoAuthenticationType",
    "cognito-identity-id" : "$context.identity.cognitoIdentityId",
    "cognito-identity-pool-id" : "$context.identity.cognitoIdentityPoolId",
    "http-method" : "$context.httpMethod",
    "stage" : "$context.stage",
    "source-ip" : "$context.identity.sourceIp",
    "user" : "$context.identity.user",
    "user-agent" : "$context.identity.userAgent",
    "user-arn" : "$context.identity.userArn",
    "request-id" : "$context.requestId",
    "resource-id" : "$context.resourceId",
    "resource-path" : "$context.resourcePath"
    }
}`
        },
        integrationResponses: [
          {
            statusCode: '200',
            responseTemplates: {
              'application/json': `#set($inputRoot = $input.path('$'))
## The next line changes the HTTP response code with the one provided by the Lambda Function
#set($context.responseOverride.status = $inputRoot.statusCode)
## Decoding base64 (this could have been left to the application)
#if( $inputRoot.isBase64Encoded == true )
$util.base64Decode($inputRoot.body)
#else
$inputRoot.body
#end`
            }
          }
        ]
      }),
      { requestParameters: { 'method.request.querystring.sessionId': true } }
    )

    //#endregion
  }
}
