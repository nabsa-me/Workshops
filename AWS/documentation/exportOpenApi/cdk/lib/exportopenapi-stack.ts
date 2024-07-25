import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as path from 'path'

export class OpenapiExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Define la función Lambda
    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../src'))
    })

    // Define la API Gateway REST API
    const api = new apigateway.RestApi(this, 'ExampleApi', {
      restApiName: 'Example API',
      description: 'This is an example API Gateway with a Lambda integration.',
      deployOptions: {
        stageName: 'prod'
      }
    })

    // Define un recurso y método
    const helloResource = api.root.addResource('hello')
    const helloIntegration = new apigateway.LambdaIntegration(helloFunction)
    helloResource.addMethod('GET', helloIntegration)

    // Output de la URL del API Gateway
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.urlForPath('/hello')
    })

    const exportApi = new apigateway.CfnDocumentationVersion(this, 'MyCfnDocumentationVersion', {
      documentationVersion: '1.0',
      restApiId: api.restApiId,

      // the properties below are optional
      description: 'docs description'
    })

    exportApi.addOverride('Properties.Mode', 'EXPORT')
    exportApi.addOverride('Properties.ExportType', 'oas30') // OpenAPI 3.0
    exportApi.addOverride('Properties.StageName', 'prod')
    exportApi.addOverride('Properties.OutputFormat', 'JSON')
    exportApi.addOverride('Properties.DestinationPath', './openapi.json')

    // // Llamada para exportar OpenAPI
    // this.exportOpenApi(api)
  }

  // private exportOpenApi(api: apigateway.RestApi) {
  //   const stack = cdk.Stack.of(this)
  //   const exportApi = new apigateway.CfnDocumentationVersion(stack, 'ExportApi', {
  //     restApiId: api.restApiId,
  //     documentationVersion: '1.0'
  //   })

  //   exportApi.addOverride('Properties.Mode', 'EXPORT')
  //   exportApi.addOverride('Properties.ExportType', 'oas30') // OpenAPI 3.0
  //   exportApi.addOverride('Properties.StageName', 'prod')
  //   exportApi.addOverride('Properties.OutputFormat', 'JSON')
  //   exportApi.addOverride('Properties.DestinationPath', './openapi.json')

  //   stack.addDependency(exportApi)
  // }
}
