export const handler = async (event: any) => {
  // The following line records the received event at the function's logs on CloudWatch Logs
  console.log(event)
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!')
  }
  return response
}
