import { createSlice, fetchFunc } from 'redux/defaultFetchSlice'

const nombre = 'obtenerHabitacionPorId';
const slice = createSlice(nombre);

export const obtenerHabitacionPorIdSelector = state => state[nombre]
export default slice.reducer

export function obtenerHabitacionPorId(id) {
  const endpoint = `/habitaciones/${id}`;
  return fetchFunc(endpoint, slice.actions);
}