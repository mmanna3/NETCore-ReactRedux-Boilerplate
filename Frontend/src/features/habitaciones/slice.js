import { createSlice } from '@reduxjs/toolkit'
import { createSliceParam, fetchFunc } from 'utils/defaultFetchSlice'

const nombre = 'habitaciones';
const habitacionesSlice = createSlice(createSliceParam(nombre));

export const habitacionesSelector = state => state[nombre]
export default habitacionesSlice.reducer

export function fetchHabitaciones() {
  const endpoint = '/habitaciones';
  return fetchFunc(endpoint, habitacionesSlice.actions);
}