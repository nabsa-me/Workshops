import { QueryFunction } from '@tanstack/query-core/build/lib'
import { Animal, BreedListAPIResponse } from './APIResponsesTypes'

const fetchBreedList: QueryFunction<BreedListAPIResponse, ['breeds', Animal]> = async ({ queryKey }) => {
  const animal = queryKey[1]

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`)

  if (!apiRes.ok) {
    throw new Error(`details/${animal} fetch not ok`)
  }

  return apiRes.json()
}

export default fetchBreedList
