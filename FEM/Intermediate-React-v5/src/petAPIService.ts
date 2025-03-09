import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Animal, BreedListAPIResponse, PetApiResponse } from './APIResponsesTypes'

export const petApi = createApi({
  reducerPath: 'petApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://pets-v2.dev-apis.com/' }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id) => ({ url: 'pets', params: { id } }),
      transformResponse: (response: PetApiResponse) => response.pets[0]
    }),
    getBreeds: builder.query({
      query: (animal: Animal) => ({ url: 'breeds', params: { animal } }),
      transformResponse: (response: BreedListAPIResponse) => response.breeds as Array<string>
    }),
    search: builder.query({
      query: ({ animal, location, breed }) => ({ url: 'pets', params: { animal, location, breed } }),
      transformResponse: (response: PetApiResponse) => response.pets
    })
  })
})

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi
