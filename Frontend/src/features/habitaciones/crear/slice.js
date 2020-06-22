import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  loading: false,
  hasErrors: false,
  requestData: '',
  respuesta: '',
}

const crearHabitacionSlice = createSlice({
  name: 'crearHabitacion',
  initialState,
  reducers: {
    postHabitacion: (state, { requestData }) => {
      state.loading = true
      state.requestData = requestData    
    },
    postHabitacionSuccess: (state, { respuesta }) => {
      state.respuesta = respuesta
      state.loading = false
      state.hasErrors = false
    },
    postHabitacionFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { postHabitacion, postHabitacionSuccess, postHabitacionFailure } = crearHabitacionSlice.actions
export const crearHabitacionSelector = state => state.crearHabitacion
export default crearHabitacionSlice.reducer

export function crearHabitacion(data) {
  
  return async dispatch => {
    dispatch(postHabitacion(data))

    try {      
      
      const response = await axios.post('/api/habitaciones', data);
      dispatch(postHabitacionSuccess(response))

    } catch (error) {
      dispatch(postHabitacionFailure())
    }
  }
}
