import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  diasArray: [],
  camasIdsArray: [],
  tabla: {},
}

const tablaDeReservasSlice = createSlice({
  name: 'tablaDeReservas',
  initialState,
  reducers: {
    inicializar: (state, { payload }) => {
      state.diasArray = payload.diasArray;
      state.camasIdsArray = payload.camasIdsArray;
      var celdaInicial = {};

      payload.camasIdsArray.forEach(camaId => celdaInicial[`${camaId}`] = "");
      payload.diasArray.forEach(dia => state.tabla[`${dia}`] = celdaInicial);
      debugger;
    },
    modificarCelda: (state, {payload}) => {
      state.tabla[`${payload.dia}`][`${payload.camaId}`] = payload.valor;
    },
    modificarPorReserva: (state, {payload}) => { 
      
      for (let dia = payload.diaInicio-1; dia <= payload.diaFin-1; dia++) {        
        payload.camasIds.forEach(camaId => {
          state.tabla[`${dia}`][`${camaId}`] = payload.aNombreDe; 
        });
      }      
    },    
  },
})

export const { inicializar, modificarCelda, modificarPorReserva } = tablaDeReservasSlice.actions
export const tablaDeReservasSelector = state => state.tablaDeReservas
export default tablaDeReservasSlice.reducer

export function inicializarTabla(diasArray, camasIdsArray) {
  return async dispatch => {
    dispatch(inicializar({diasArray, camasIdsArray}));
  }
}

export function actualizarCelda(dia, camaId, valor) {
  return async dispatch => {
    dispatch(modificarCelda({dia, camaId, valor}));
  }
}

export function actualizarConReserva(reserva) {
  return async dispatch => {
    dispatch(modificarPorReserva(reserva));
  }
}




