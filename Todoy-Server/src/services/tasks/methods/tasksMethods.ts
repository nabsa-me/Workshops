export const getTasks = async (queryStringParameters: any) => {
  console.log('GET TASK METHOD', queryStringParameters)
}

export const updateTask = async (body: any) => {
  console.log('UPDATE TASK METHOD', body)
}

export const createTask = async (body: any) => {
  console.log('CREATE TASK METHOD', body)
}

export const deleteTask = async (patchParameters: any) => {
  console.log('DELETE TASK METHOD', patchParameters)
}
