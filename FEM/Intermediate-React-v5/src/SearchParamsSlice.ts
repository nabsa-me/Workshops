import { createSlice } from '@reduxjs/toolkit'
import { Slice, Reducer } from '@reduxjs/toolkit/dist'

const searchParamsSlice: Slice = createSlice({
  name: 'searchParams',
  initialState: {
    value: {
      location: '',
      breed: '',
      animal: ''
    }
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { all } = searchParamsSlice.actions
export default searchParamsSlice.reducer as Reducer
