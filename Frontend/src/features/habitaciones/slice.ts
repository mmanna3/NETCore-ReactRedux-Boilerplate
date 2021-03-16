import { createSlice, fetchFunc } from 'store/defaultFetchSlice';
import { HabitacionDTO } from 'interfaces/habitacion';
import { AxiosResponse } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

const nombre = 'habitaciones';
const slice = createSlice(nombre);

export const habitacionesSelector = (state: any): any => state[nombre];
export default slice.reducer;

export function fetchHabitaciones(): (dispatch: Dispatch) => Promise<AxiosResponse<HabitacionDTO>> {
  const endpoint = '/habitaciones';
  return fetchFunc<HabitacionDTO>(endpoint, slice.actions);
}
