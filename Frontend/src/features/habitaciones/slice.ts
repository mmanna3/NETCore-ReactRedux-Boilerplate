import { createSlice, fetchFunc } from 'redux/defaultFetchSlice';
import { HabitacionDTO } from 'interfaces/habitacion';

const nombre = 'habitaciones';
const slice = createSlice(nombre);

export const habitacionesSelector = (state: any) => state[nombre];
export default slice.reducer;

export function fetchHabitaciones() {
  const endpoint = '/habitaciones';
  return fetchFunc<HabitacionDTO>(endpoint, slice.actions);
}
