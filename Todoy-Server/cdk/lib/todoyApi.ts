import { App, Stack } from 'aws-cdk-lib'
import {
  ApiKey,
  ApiKeySourceType,
  EndpointType,
  LambdaIntegration,
  RestApi,
  UsagePlan
} from 'aws-cdk-lib/aws-apigateway'
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Function } from 'aws-cdk-lib/aws-lambda'
import { ITodoyStackProps } from '../types'

export class TodoyApiStack extends Stack {
  constructor(scope: App, id: string, props: ITodoyStackProps) {
    super(scope, id, props)

    const baseId = props.baseId
    const stage = process.env.STAGE
    const environment = process.env.ENV

    const api = new RestApi(this, `${baseId}-API-${environment}`, {
      restApiName: `${baseId}-RestApi-${environment}`,
      description: 'Todoy Rest Api Service',
      endpointConfiguration: { types: [EndpointType.EDGE] },
      apiKeySourceType: ApiKeySourceType.HEADER,
      cloudWatchRole: false,
      deploy: true,
      deployOptions: {
        stageName: stage
      }
    })

    const apiKey = new ApiKey(this, `${baseId}-APIKey-${stage}`, {
      apiKeyName: `${baseId}-APIKey-${stage}`
    })

    const apiUsagePlan = new UsagePlan(this, `${baseId}-APIUsagePlan-${stage}`, {
      name: `${baseId}-APIUsagePlan-${stage}`,
      apiStages: [{ api, stage: api.deploymentStage }]
    })

    apiUsagePlan.addApiKey(apiKey)

    const tasksLambdaFunction = Function.fromFunctionAttributes(this, 'TasksLambdaFunction', {
      functionArn: props.tasksLambdaArn!,
      sameEnvironment: true
    })

    tasksLambdaFunction.addPermission('ApiInvokePermission', {
      principal: new ServicePrincipal('apigateway.amazonaws.com'),
      action: 'lambda:InvokeFunction',
      sourceArn: `${api.arnForExecuteApi()}/*/*/*`
    })

    const tasksLambdaIntegration = new LambdaIntegration(tasksLambdaFunction, { proxy: true })

    const tasksApi = api.root.addResource('tasks')

    tasksApi.addMethod('GET', tasksLambdaIntegration, { apiKeyRequired: true })
    tasksApi.addMethod('PUT', tasksLambdaIntegration, { apiKeyRequired: true })
    tasksApi.addMethod('POST', tasksLambdaIntegration, { apiKeyRequired: true })
    tasksApi.addMethod('DELETE', tasksLambdaIntegration, { apiKeyRequired: true })
  }
}
