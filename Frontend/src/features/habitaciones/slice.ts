import { createSlice, fetchFunc } from 'redux/defaultFetchSlice'
import { IHabitacion } from 'interfaces/habitacion'

const nombre = 'habitaciones';
const slice = createSlice(nombre);

export const habitacionesSelector = (state: any) => state[nombre]
export default slice.reducer

export function fetchHabitaciones() {
  const endpoint = '/habitaciones';
  return fetchFunc<IHabitacion>(endpoint, slice.actions);
}