import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  loading: false,
  requestData: '',
  responseData: '',
  validationErrors: undefined
};

const crearReservaSlice = createSlice({
  name: 'crearReserva',
  initialState,
  reducers: {
    postInit: (state, { payload }) => {
      state.loading = true
      state.requestData = payload
    },
    postSuccess: state => {
      state.loading = false
      state.validationErrors = undefined
    },
    postFailure: (state, {payload}) => {
      state.loading = false
      state.validationErrors = payload?.errors
    },
    reset: (state) => {
      state.loading = false
      state.responseData = ''
      state.requestData = ''
      state.validationErrors = undefined
    },
  },
})

export const { postInit, postSuccess, postFailure, reset } = crearReservaSlice.actions
export const crearReservaSelector = state => state.crearReserva
export default crearReservaSlice.reducer

export function crearReserva(data, onSuccess) {  

  return async dispatch => {
    dispatch(postInit(data));

    axios.post('/api/reservas', data)
      .then((res) => {
        dispatch(postSuccess(res.data));
        onSuccess();
      })
      .catch((error) => {
          dispatch(postFailure(error.response.data));
      })
  }
}

export function cleanErrors() {
  
  return async dispatch => {
    dispatch(reset());
  }
}
