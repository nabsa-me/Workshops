import { configureStore } from '@reduxjs/toolkit'
import { ConfigureStoreOptions } from '@reduxjs/toolkit/dist'
import adoptedPet from './AdoptedPetSlice'
import searchParams from './SearchParamsSlice'
import { petApi } from './petAPIService'

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(petApi.middleware)
} as ConfigureStoreOptions)

export default store
