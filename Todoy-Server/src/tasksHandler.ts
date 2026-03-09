export const handler = async (event: Record<string, any>) => {
  console.log(event)

  console.log('HELLO WORLD')

  const response = { statusCode: 200 }
  return response
}
