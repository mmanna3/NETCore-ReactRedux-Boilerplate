import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  loading: false,
  hasSuccess: false,
  hasErrors: false,
  requestData: '',
  responseData: '',
  validationErrors: undefined
}

const crearHabitacionSlice = createSlice({
  name: 'crearHabitacion',
  initialState,
  reducers: {
    postInit: (state, { payload }) => {
      state.loading = true
      state.requestData = payload
    },
    postSuccess: state => {
      state.loading = false
      state.hasSuccess = true
    },
    postFailure: (state, {payload}) => {
      state.loading = false
      state.hasErrors = true
      state.validationErrors = payload?.errors
    },
    postReset: (state) => {
      state.loading = false
      state.hasSuccess = false
      state.hasErrors = false
      state.responseData = ''
      state.requestData = ''
      state.validationErrors = undefined
    },
  },
})

export const { postInit, postSuccess, postFailure, postReset } = crearHabitacionSlice.actions
export const crearHabitacionSelector = state => state.crearHabitacion
export default crearHabitacionSlice.reducer

export function crearHabitacion(data) {

  return async dispatch => {
    dispatch(postInit(data));

    axios.post('/api/habitaciones', data)
      .then((res) => {
        dispatch(postSuccess(res.data));
      })
      .catch((error) => {
          dispatch(postFailure(error.response.data));
      })
  }
}

export function cleanState() {
  
  return async dispatch => {
    dispatch(postReset());
  }
}
