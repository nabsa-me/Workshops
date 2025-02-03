import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as path from 'path'
import * as fs from 'fs'
import * as yaml from 'yaml'

export class AsyncapiRestApiExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Lee el archivo AsyncAPI y lo parsea a un objeto
    const asyncApiDefinitionPath = path.join(__dirname, '../../src/asyncapi.yaml')
    const asyncApiDefinitionContent = fs.readFileSync(asyncApiDefinitionPath, 'utf8')
    const asyncApiDefinition = yaml.parse(asyncApiDefinitionContent)

    // Define la función Lambda
    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../src'))
    })

    // Crea el API Gateway REST API
    const api = new apigateway.RestApi(this, 'AsyncApiExampleApi', {
      restApiName: 'AsyncAPI Example',
      description: 'This is an example API integrated with Lambda using CDK.',
      deployOptions: {
        stageName: 'prod'
      }
    })

    // Obtén los canales desde la definición AsyncAPI
    const channels = asyncApiDefinition.channels || {}

    // Itera sobre cada canal y crea los recursos correspondientes
    for (const [path] of Object.entries(channels)) {
      // Crea un recurso para la ruta definida en el canal
      const resource = api.root.resourceForPath(path)

      // Obtiene la integración y el método HTTP desde la especificación (en este caso, asumimos 'GET')
      const integration = new apigateway.LambdaIntegration(helloFunction)

      // Añadir el método GET al recurso
      resource.addMethod('GET', integration)
    }

    // Imprimir la URL del API Gateway
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.urlForPath('/hello')
    })
  }
}
