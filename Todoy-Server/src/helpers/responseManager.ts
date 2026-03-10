export const lambdaResponseHandler = (result: any, event: any) => {
  return {
    statusCode: result.code,
    body: JSON.stringify({ message: result.message, event })
  }
}
