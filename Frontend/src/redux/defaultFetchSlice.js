import { createSlice as createSliceRTK } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  estaCargando: false,
  tieneErrores: false,
  datos: [],
}

export const createSlice = (nombre) => 
  createSliceRTK({
    name: nombre,
    initialState,
    reducers: {
      fetchInit: state => {
        state.estaCargando = true
      },
      fetchSuccess: (state, { payload }) => {
        state.datos = payload
        state.estaCargando = false
        state.tieneErrores = false
      },
      fetchFailure: state => {
        state.estaCargando = false
        state.tieneErrores = true
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
