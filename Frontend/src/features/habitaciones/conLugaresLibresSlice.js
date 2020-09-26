import { createSlice } from '@reduxjs/toolkit'
import { createSliceParam, fetchFunc } from './defaultFetchSlice'

const nombre = 'habitacionesConLugaresLibres';
const habitacionesSlice = createSlice(createSliceParam(nombre));

export const habitacionesSelector = state => state[nombre]
export default habitacionesSlice.reducer

export function fetchHabitacionesConLugaresLibres(desde, hasta) {
  var endpoint = `/habitaciones/conLugaresLibres?desde=${desde}&hasta=${hasta}`;
  return fetchFunc(endpoint, habitacionesSlice.actions);  
}