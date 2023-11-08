import { AbonementScheme } from '../types/abonement.scheme'
import { createSlice } from '@reduxjs/toolkit'

const initialState: AbonementScheme = {
  selectedId: null,
}

export const abonementSlice = createSlice({
  name: 'abonement',
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

export const { actions: abonementActions } = abonementSlice
export const { reducer: abonementReducer } = abonementSlice