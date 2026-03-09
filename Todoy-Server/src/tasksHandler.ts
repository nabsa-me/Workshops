export const handler = async (event: Record<string, any>, context: any) => {
  console.log('EVENT', event)
  console.log('CONTEXT', context)

  console.log('HELLO WORLD')

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Well Done' })
  }

  return response
}
