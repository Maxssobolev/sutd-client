import { OrderScheme } from '../types/order.scheme'
import { createSlice } from '@reduxjs/toolkit'

const initialState: OrderScheme = {
  selectedId: null,
}

export const orderSlice = createSlice({
  name: 'order',
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

export const { actions: orderActions } = orderSlice
export const { reducer: orderReducer } = orderSlice