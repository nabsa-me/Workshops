import express from 'express'
import { handler } from '../src/services/tasks/handler'

const router = express.Router()

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const lambdaHandler = async (req: any, res: any, next: any) => {
  try {
    const serviceName = String(req.url).split('/')[1]
    const formattedServiceName = capitalize(serviceName)

    const event = {
      resource: req.url,
      path: req.url,
      httpMethod: req.method,
      queryStringParameters: req.query,
      multiValueQueryStringParameters: req.query,
      pathParameters: req.params,
      requestContext: { stage: 'latest' },
      body: req.body
    }
    const context = { functionName: `Todoy-${formattedServiceName}-Lambda-dev` }

    const result = await handler(event, context)

    res.status(result.statusCode || 200).send(result.body)
  } catch (error) {
    next(error)
  }
}

router.route('/tasks').all(lambdaHandler)

module.exports = router
