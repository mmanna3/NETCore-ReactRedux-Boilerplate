import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  cantidadDeDias: 0,
}

const tablaDeReservasSlice = createSlice({
  name: 'tablaDeReservas',
  initialState,
  reducers: {
    inicializar: (state, { payload }) => {
      state.cantidadDeDias = payload.cantidadDeDias
    },
    
  },
})

export const { inicializar } = tablaDeReservasSlice.actions
export const tablaDeReservasSelector = state => state.tablaDeReservas
export default tablaDeReservasSlice.reducer

export function inicializarTabla(cantidadDeDias, camasIdsArray) {
  return async dispatch => {
    dispatch(inicializar({cantidadDeDias, camasIdsArray}));
  }
}