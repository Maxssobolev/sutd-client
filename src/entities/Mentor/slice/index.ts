import { AbonementScheme } from '../types/client.scheme'
import { createSlice } from '@reduxjs/toolkit'

const initialState: AbonementScheme = {
  selectedId: null,
}

export const clientSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {
    select: (state, {payload}) => {
      state.selectedId = payload
    },
    deselect: (state) => { 
      state.selectedId = null
    }
    
  },
})

export const { actions: clientActions } = clientSlice
export const { reducer: clientReducer } = clientSlice