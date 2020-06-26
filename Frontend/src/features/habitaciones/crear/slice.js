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
    postFinished: (state) => {
      state.loading = false
      state.hasSuccess = false
      state.hasErrors = false
      state.responseData = ''
      state.requestData = ''
    },
  },
})

export const { postInit: post, postSuccess, postFailure, postFinished } = crearHabitacionSlice.actions
export const crearHabitacionSelector = state => state.crearHabitacion
export default crearHabitacionSlice.reducer

export function crearHabitacion(data) {

  return async dispatch => {
    dispatch(post(data));

    axios.post('/api/habitaciones', data)
      .then((res) => {
        dispatch(postSuccess(res.data));
      })
      .catch((error) => {
          dispatch(postFailure(error.response.data));
      })
      .then(() => {
        dispatch(postFinished());
      })
  }
}
