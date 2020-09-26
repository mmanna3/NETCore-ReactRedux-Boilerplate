import { createSlice, fetchFunc } from 'redux/defaultFetchSlice'

const nombre = 'habitaciones';
const slice = createSlice(nombre);

export const habitacionesSelector = state => state[nombre]
export default slice.reducer

export function fetchHabitaciones() {
  const endpoint = '/habitaciones';
  return fetchFunc(endpoint, slice.actions);
}