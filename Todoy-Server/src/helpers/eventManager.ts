export const getProcessEvent = ({ event, context }: { context: any; event: any }) => {
  const processEvent = {
    resource: event.resource,
    path: event.path,
    httpMethod: event.httpMethod,
    queryStringParameters: event.queryStringParameters,
    multiValueQueryStringParameters: event.multiValueQueryStringParameters,
    requestContext: { stage: event.requestContext.stage },
    body: event.body,
    functionName: context.functionName
  }

  return processEvent
}
