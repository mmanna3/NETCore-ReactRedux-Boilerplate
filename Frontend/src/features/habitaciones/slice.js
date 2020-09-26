import { createSlice } from '@reduxjs/toolkit'
import {createSliceParam, fetchFunc} from './defaultFetchSlice'

const nombre = 'habitaciones';
const endpoint = '/habitaciones';
const habitacionesSlice = createSlice(createSliceParam(nombre));

export const habitacionesSelector = state => state[nombre]
export default habitacionesSlice.reducer

export function fetchHabitaciones() {
  return fetchFunc(endpoint, habitacionesSlice.actions);
}

export function fetchHabitacionesConLugaresLibres(desde, hasta) {
  
  return null;
}