export const handler = async (event: any) => {
  // let's log the incoming event
  let payloadAsString = JSON.stringify(event)
  console.log(payloadAsString)
  const response = {
    statusCode: 200,
    body: `we received ${payloadAsString}`
  }
  return response
}
