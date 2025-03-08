// eslint-disable-next-line import/named
import { QueryFunction } from '@tanstack/react-query'
import { PetApiResponse } from './APIResponsesTypes'

const fetchPet: QueryFunction<PetApiResponse, ['details', string]> = async ({ queryKey }) => {
  const id = queryKey[1]

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`)

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`)
  }

  return apiRes.json()
}

export default fetchPet
