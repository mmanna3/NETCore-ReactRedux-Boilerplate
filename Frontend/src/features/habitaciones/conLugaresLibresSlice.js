import { createSlice, fetchFunc } from 'redux/defaultFetchSlice'

const nombre = 'habitacionesConLugaresLibres';
const slice = createSlice(nombre);

export const habitacionesSelector = state => state[nombre]
export default slice.reducer

export function fetchHabitacionesConLugaresLibres(desde, hasta) {
  var endpoint = `/habitaciones/conLugaresLibres?desde=${desde}&hasta=${hasta}`;
  return fetchFunc(endpoint, slice.actions);  
}