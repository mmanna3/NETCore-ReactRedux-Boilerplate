import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  loading: false,
  hasErrors: false,
  datos: [],
}

const crearHabitacionSlice = createSlice({
  name: 'crearHabitacion',
  initialState,
  reducers: {
    postHabitacion: state => {
      state.loading = true
    },
    postHabitacionSuccess: (state, { payload }) => {
      state.datos = payload
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

export function crearHabitacion() {
  return async dispatch => {
    dispatch(postHabitacion())

    try {
      
      const response = await axios.post('/api/habitaciones', {nombre: 'pedro'} );      

      dispatch(postHabitacionSuccess(response))
    } catch (error) {
      dispatch(postHabitacionFailure())
    }
  }
}
