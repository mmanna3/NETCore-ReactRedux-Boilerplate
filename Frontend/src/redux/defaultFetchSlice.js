import { createSlice as createSliceRTK } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  hasErrors: false,
  datos: [],
}

export const createSlice = (nombre) => 
  createSliceRTK({
    name: nombre,
    initialState,
    reducers: {
      fetchInit: state => {
        state.loading = true
      },
      fetchSuccess: (state, { payload }) => {
        state.datos = payload
        state.loading = false
        state.hasErrors = false
      },
      fetchFailure: state => {
        state.loading = false
        state.hasErrors = true
      },
    },
  });

export function fetchFunc(endpoint, actions) {
  const { fetchInit, fetchSuccess, fetchFailure } = actions
  
  return async dispatch => {
    dispatch(fetchInit());

    axios.get('/api'+endpoint)
    .then((res) => {      
      dispatch(fetchSuccess(res.data));
    })
    .catch((error) => {
        dispatch(fetchFailure(error.response.data));
    })
  }
}
