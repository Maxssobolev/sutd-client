import { PurchaseScheme } from '../types/purchase.scheme'
import { createSlice } from '@reduxjs/toolkit'

const initialState: PurchaseScheme = {
  selectedId: null,
}

export const purchaseSlice = createSlice({
  name: 'purchase',
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

export const { actions: purchaseActions } = purchaseSlice
export const { reducer: purchaseReducer } = purchaseSlice