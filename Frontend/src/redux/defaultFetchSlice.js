import { createSlice as createSliceRTK } from '@reduxjs/toolkit'
import axios from 'axios'
import ESTADOS from './estadosFetch'

const initialState = {
  estado: ESTADOS.inactivo,
  datos: [],
}

export const createSlice = (nombre) => 
  createSliceRTK({
    name: nombre,
    initialState,
    reducers: {
      fetchInit: state => {
        state.estado = ESTADOS.cargando
      },
      fetchSuccess: (state, { payload }) => {
        state.datos = payload
        state.estado = ESTADOS.exitoso
      },
      fetchFailure: state => {
        state.estado = ESTADOS.huboError
      },
    },
  });

export function fetchFunc(endpoint, actions, onSuccessCallback) {
  const { fetchInit, fetchSuccess, fetchFailure } = actions
  
  return async dispatch => {
    dispatch(fetchInit());

    axios.get('/api'+endpoint)
    .then((res) => {      
      dispatch(fetchSuccess(res.data));
      typeof onSuccessCallback === 'function' && onSuccessCallback();
    })
    .catch((error) => {
        dispatch(fetchFailure(error.response.data));
    })
  }
}
