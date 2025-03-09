import { createSlice } from '@reduxjs/toolkit'
import { Slice, Reducer } from '@reduxjs/toolkit/dist'

export const adoptedPetSlice: Slice = createSlice({
  name: 'adoptedPet',
  initialState: {
    value: null
  },
  reducers: {
    adopt: (state, action) => {
      state.value = action.payload
    },
    unadopt: (state, action) => {
      state.value = { ...state.value, value: action.payload }
    }
  }
})

export const { adopt } = adoptedPetSlice.actions
export default adoptedPetSlice.reducer as Reducer
