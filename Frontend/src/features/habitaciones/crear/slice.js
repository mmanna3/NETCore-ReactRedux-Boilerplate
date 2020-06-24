import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  loading: false,
  hasSuccess: false,
  hasErrors: false,
  requestData: '',
  respuesta: '',
}

const crearHabitacionSlice = createSlice({
  name: 'crearHabitacion',
  initialState,
  reducers: {
    post: (state, { requestData }) => {
      state.loading = true
      state.requestData = requestData    
    },
    postSuccess: (state, { respuesta }) => {
      state.respuesta = respuesta
      state.loading = false
      state.hasSuccess = true
    },
    postFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { post, postSuccess, postFailure } = crearHabitacionSlice.actions
export const crearHabitacionSelector = state => state.crearHabitacion
export default crearHabitacionSlice.reducer

export function crearHabitacion(data) {

  return async dispatch => {
    dispatch(post(data));

    try {
      const response = await axios.post('/api/habitaciones', data);
      dispatch(postSuccess(response.data));

    } catch (error) {
      dispatch(postFailure());
    }
  }
}
