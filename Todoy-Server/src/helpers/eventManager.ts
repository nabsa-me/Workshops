import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import {
  httpMethodTypes,
  IProcessEvent,
  multiValueQueryStringParametersTypes,
  pathParametersTypes,
  pathTypes,
  queryStringParametersTypes,
  resourceTypes,
  stageTypes
} from '../types/lambdaTypes'

export const getProcessEvent = ({
  event,
  context
}: {
  event: Partial<APIGatewayProxyEvent>
  context: Partial<Context>
}) => {
  const processEvent: IProcessEvent = {
    resource: event.resource as resourceTypes,
    path: event.path as pathTypes,
    httpMethod: event.httpMethod as httpMethodTypes,
    queryStringParameters: event.queryStringParameters as queryStringParametersTypes,
    multiValueQueryStringParameters: event.multiValueQueryStringParameters as multiValueQueryStringParametersTypes,
    pathParameters: event.pathParameters as pathParametersTypes,
    requestContext: { stage: event.requestContext?.stage as stageTypes },
    body: event.body as string | null,
    functionName: (context?.functionName as string) || 'local-running-function'
  }

  return processEvent
}
