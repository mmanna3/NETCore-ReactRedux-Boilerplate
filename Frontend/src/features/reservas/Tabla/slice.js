import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  cantidadDeDias: 0,
  camasIdsArray: [],
  tabla: [],
}

const tablaDeReservasSlice = createSlice({
  name: 'tablaDeReservas',
  initialState,
  reducers: {
    inicializar: (state, { payload }) => {
      state.cantidadDeDias = payload.cantidadDeDias;
      state.camasIdsArray = payload.camasIdsArray;

      var celdaInicial = {};
      payload.camasIdsArray.forEach(camaId => {
        celdaInicial[`${camaId}`] = "vacío";
      });

      for(var i=0; i < payload.cantidadDeDias; i++) {
        state.tabla[i] = celdaInicial;
      }

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