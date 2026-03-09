export const handler = async (event: Record<string, any>) => {
  console.log('EVENT', event)

  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Well Done' })
  }

  return response
}
