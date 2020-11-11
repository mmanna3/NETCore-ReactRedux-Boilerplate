import { createSlice, fetchFunc } from 'redux/defaultFetchSlice'

const nombre = 'checkoutsDeHoy';
const slice = createSlice(nombre);

export const checkoutsDeHoySelector = state => state[nombre]
export default slice.reducer

export function fetchCheckoutsDeHoy() {  
  const endpoint = '/reservas/checkoutsDeHoy';
  return fetchFunc(endpoint, slice.actions);
}