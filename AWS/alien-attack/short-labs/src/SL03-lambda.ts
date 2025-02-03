import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
const SSM = new SSMClient()

export const handler = async (event: Record<'Name', string>) => {
  // logging the received event
  console.log(event)
  let responseFromSSM
  let result

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
    } catch (err: any) {
      console.log('ERROR')
      console.log(err)
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
