import express, { Request, Response, NextFunction } from 'express'
import { handler } from '../src/services/tasks/handler'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import {
  httpMethodTypes,
  IExpressLambdaContext,
  IExpressLambdaEvent,
  multiValueQueryStringParametersTypes,
  pathParametersTypes,
  pathTypes,
  queryStringParametersTypes,
  resourceTypes,
  stageTypes
} from '../src/types/lambdaTypes'

const router = express.Router()

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

const lambdaHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const serviceName = String(req.url).split('/')[1]
    const formattedServiceName = capitalize(serviceName)

    const event: IExpressLambdaEvent = {
      resource: req.url as resourceTypes,
      path: req.url as pathTypes,
      httpMethod: req.method as httpMethodTypes,
      queryStringParameters: req.query as queryStringParametersTypes,
      multiValueQueryStringParameters: req.query as multiValueQueryStringParametersTypes,
      pathParameters: req.params as pathParametersTypes,
      requestContext: { stage: 'local' as stageTypes },
      body: req.body
    }
    const context: IExpressLambdaContext = { functionName: `Todoy-${formattedServiceName}-Lambda-dev` }

    const result = await handler(event as Partial<APIGatewayProxyEvent>, context as Partial<Context>)

    res.status(result.statusCode || 200).send(result.body)
  } catch (error) {
    next(error)
  }
}

router.route('/tasks').all(lambdaHandler)

export default router
