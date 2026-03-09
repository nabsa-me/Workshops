import { App, Stack, StackProps } from 'aws-cdk-lib'
import {
  ApiKey,
  ApiKeySourceType,
  Cors,
  Deployment,
  EndpointType,
  LambdaIntegration,
  RestApi,
  Stage,
  UsagePlan
} from 'aws-cdk-lib/aws-apigateway'
import { IFunction } from 'aws-cdk-lib/aws-lambda'

interface ITodoyApiStackProps extends StackProps {
  baseId: string
  apiLambda: IFunction
}

export class TodoyApiStack extends Stack {
  constructor(scope: App, id: string, props: ITodoyApiStackProps) {
    super(scope, id, props)

    const baseId = props.baseId
    const stage = process.env.STAGE
    const environment = process.env.ENV

    const api = new RestApi(this, `${baseId}-API-${environment}`, {
      restApiName: `${baseId}-RestApi-${environment}`,
      description: 'Todoy Rest Api Service',
      endpointConfiguration: { types: [EndpointType.EDGE] },
      defaultCorsPreflightOptions: { allowOrigins: Cors.ALL_ORIGINS, allowMethods: Cors.ALL_METHODS },
      apiKeySourceType: ApiKeySourceType.HEADER,
      cloudWatchRole: false,
      deploy: false
    })

    const apiDeployment = new Deployment(this, `${baseId}-APIDeployment-${stage}`, { api })

    const apiStage = new Stage(this, `${baseId}-APIStage-${stage}`, {
      deployment: apiDeployment,
      stageName: stage
    })

    const apiKey = new ApiKey(this, `${baseId}-APIKey-${stage}`, {
      apiKeyName: `${baseId}-APIKey-${stage}`
    })

    const apiUsagePlan = new UsagePlan(this, `${baseId}-APIUsagePlan-${stage}`, {
      name: `${baseId}-APIUsagePlan-${stage}`,
      apiStages: [{ api, stage: apiStage }]
    })

    apiUsagePlan.addApiKey(apiKey)

    const tasksLambdaIntegration = new LambdaIntegration(props.apiLambda)

    const tasksApi = api.root.addResource('tasks')
    tasksApi.addMethod('GET', tasksLambdaIntegration, { apiKeyRequired: true })
  }
}
