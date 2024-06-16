import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
import { Handler } from 'aws-cdk-lib/aws-lambda'
const SSM = new SSMClient()

export const handler: Handler = async (event) => {
  // logging the received event
  console.log(event)
  console.log(event.type)
  let responseFromSSM = null
  let result = null

  if (!event.Name)
    // event does not have the proper format
    result = {
      statusCode: 400,
      body: 'Invalid parameter'
    }
  else
    try {
      // parameter expected by SSM.getParameter
      let parameter = {
        Name: '/WS/Alien-Attack/' + event.Name + '/configuration'
      }
      const getParameterCommand = new GetParameterCommand(parameter)
      responseFromSSM = await SSM.send(getParameterCommand)
      console.log('SUCCESS')
      console.log(responseFromSSM)
      let value = JSON.parse(responseFromSSM.Parameter?.Value as any)
      console.log(value)
      result = {
        statusCode: 200,
        body: JSON.stringify(value)
      }
    } catch (err) {
      console.log('ERROR')
      console.log(err)
      console.log(err.type)
      if (err.StatusCode)
        result = {
          statusCode: err.StatusCode,
          body: err.code
        }
      else
        result = {
          statusCode: 500,
          body: err.code
        }
    }
  return result
}
