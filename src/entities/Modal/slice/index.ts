import { ModalScheme } from '../types/modal.scheme'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ModalScheme = {
  confirmationText: '',
  isShow: false,
  payload: null,
  type: 'unset',
  additionalText: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openWith: (state, {payload}:{ payload: ModalScheme}) => {
      state.isShow = true;
      state.type = payload.type;
      state.confirmationText = payload.confirmationText;
      state.payload = payload.payload;
      state.additionalText = payload.additionalText || '';
    },
    close: (state) => { 
      state.isShow = false;
      state.confirmationText = '';
      state.payload = null;
      state.type = 'unset';
      state.additionalText = '';
      
    }
    
  },
})

export const { actions: modalActions } = modalSlice
export const { reducer: modalReducer } = modalSlice