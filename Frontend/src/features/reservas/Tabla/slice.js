import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  cantidadDeDias: 0,
  camasIdsArray: []
}

const tablaDeReservasSlice = createSlice({
  name: 'tablaDeReservas',
  initialState,
  reducers: {
    inicializar: (state, { payload }) => {
      state.cantidadDeDias = payload.cantidadDeDias
      state.camasIdsArray = payload.camasIdsArray
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