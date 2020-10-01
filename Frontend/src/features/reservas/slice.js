import { createSlice, fetchFunc } from 'redux/defaultFetchSlice'

const nombre = 'reservas';
const slice = createSlice(nombre);

export const reservasSelector = state => state[nombre]
export default slice.reducer

export function fetchReservas() {
  const endpoint = '/reservas';
  return fetchFunc(endpoint, slice.actions);
}