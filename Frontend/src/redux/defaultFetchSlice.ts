import { createSlice as createSliceRTK, Slice, Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import ESTADOS from './estadosFetch';

const initialState = {
  estado: ESTADOS.inactivo,
  datos: [],
};

export const createSlice = (nombre: string): Slice =>
  createSliceRTK({
    name: nombre,
    initialState,
    reducers: {
      fetchInit: (state): void => {
        state.estado = ESTADOS.cargando;
      },
      fetchSuccess: (state, { payload }): void => {
        state.datos = payload;
        state.estado = ESTADOS.exitoso;
      },
      fetchFailure: (state): void => {
        state.estado = ESTADOS.huboError;
      },
    },
  });

export function fetchFunc<T>(
  endpoint: string,
  actions: any,
  onSuccessCallback?: () => void
): (dispatch: Dispatch) => Promise<AxiosResponse<T>> {
  const { fetchInit, fetchSuccess, fetchFailure } = actions;

  return async (dispatch: Dispatch): Promise<any> => {
    dispatch(fetchInit());

    axios
      .get<T[]>('/api' + endpoint)
      .then((res): void => {
        dispatch(fetchSuccess(res.data));
        typeof onSuccessCallback === 'function' && onSuccessCallback();
      })
      .catch((error): void => {
        dispatch(fetchFailure(error.response.data));
      });
  };
}
