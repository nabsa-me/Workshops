export const lambdaResponseHandler = (result: any) => {
  return {
    statusCode: result.code,
    body: JSON.stringify({ message: result.message, event: result.event })
  }
}
