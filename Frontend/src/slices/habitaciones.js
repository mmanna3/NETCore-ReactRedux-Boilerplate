import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  habitaciones: [],
}

const habitacionesSlice = createSlice({
  name: 'habitaciones',
  initialState,
  reducers: {
    getHabitaciones: state => {
      state.loading = true
    },
    getHabitacionesSuccess: (state, { payload }) => {
      state.habitaciones = payload
      state.loading = false
      state.hasErrors = false
    },
    getHabitacionesFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getHabitaciones, getHabitacionesSuccess, getHabitacionesFailure } = habitacionesSlice.actions
export const habitacionesSelector = state => state.habitaciones
export default habitacionesSlice.reducer

export function fetchHabitaciones() {
  return async dispatch => {
    dispatch(getHabitaciones())

    try {
      const response = await fetch('/api/habitaciones')
      const data = await response.json()

      dispatch(getHabitacionesSuccess(data))
    } catch (error) {
      dispatch(getHabitacionesFailure())
    }
  }
}
