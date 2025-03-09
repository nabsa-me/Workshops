import { QueryFunction } from '@tanstack/query-core/build/lib'
import { Animal, PetApiResponse } from './APIResponsesTypes'

const fetchSearch: QueryFunction<
  PetApiResponse,
  [
    'search',
    {
      location: string
      animal: Animal
      breed: string
    }
  ]
> = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1]

  const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
  if (!res) {
    throw new Error(`pet search not okay ${animal}, ${location}, ${breed}`)
  }
  return res.json()
}

export default fetchSearch
