import { createSlice, fetchFunc } from 'redux/defaultFetchSlice'

const nombre = 'reservas';
const slice = createSlice(nombre);

export const reservasSelector = state => state[nombre]
export default slice.reducer

export function fetchReservasMensuales(anio, mes) {
  const endpoint = `/reservas/mensuales?anio=${anio}&mes=${mes}`;
  return fetchFunc(endpoint, slice.actions);
}

export function fetchReservasActuales() {
  const endpoint = `/reservas/actuales`;
  return fetchFunc(endpoint, slice.actions);
}