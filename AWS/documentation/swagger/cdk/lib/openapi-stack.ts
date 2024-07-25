import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
// import { Construct } from 'constructs'
import * as path from 'path'
import * as fs from 'fs'
import * as yaml from 'yaml'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export class OpenapiCdkExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    cdk.Tags.of(this).add('Name', this.stackName)
    cdk.Tags.of(this).add('Project', 'Documentation')

    // Define la función Lambda
    const helloFunction = new NodejsFunction(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../../src/handler.ts')
    })

    // Lee el archivo OpenAPI
    const openApiDefinitionContent = fs.readFileSync(path.join(__dirname, '../../src/openapi.yaml'), 'utf-8')
    const openApiDefinition = yaml.parse(openApiDefinitionContent) // Parseamos el YAML a un objeto

    // Crea el API Gateway REST API usando OpenAPI
    const api = new apigateway.SpecRestApi(this, 'OpenApiExampleApi', {
      apiDefinition: apigateway.ApiDefinition.fromInline(openApiDefinition),
      deployOptions: {
        stageName: 'prod'
      }
    })

    // Asocia la función Lambda con la integración GET
    const helloIntegration = new apigateway.LambdaIntegration(helloFunction)
    api.root.addResource('hello').addMethod('GET', helloIntegration)
  }
}
