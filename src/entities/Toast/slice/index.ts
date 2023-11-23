import { ToastScheme } from '../types/client.scheme'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ToastScheme = {
  isShow: false,
  type: 'success',
  text: ''
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    show: (state, {payload}: {payload: Omit<ToastScheme, 'isShow'>}) => {
      state.isShow = true;
      state.type = payload.type;
      state.text = payload.text || '';
    },
    hide: (state) => { 
      state.isShow = false;
      state.text = '';
    }
    
  },
})

export const { actions: toastActions } = toastSlice
export const { reducer: toastReducer } = toastSlice