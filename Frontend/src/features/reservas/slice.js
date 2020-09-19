import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  loading: false,
  hasErrors: false,
  datos: [],
}

const reservasSlice = createSlice({
  name: 'reservas',
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
})

export const { fetchInit, fetchSuccess, fetchFailure } = reservasSlice.actions
export const reservasSelector = state => state.reservas
export default reservasSlice.reducer

export function fetchreservas() {
  
  return async dispatch => {
    dispatch(fetchInit());

    axios.get('/api/reservas')
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .catch((error) => {
        dispatch(fetchFailure(error.response.data));
    })
  }
}
