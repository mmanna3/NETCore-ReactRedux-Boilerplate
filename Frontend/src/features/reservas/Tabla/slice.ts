import { createSlice } from '@reduxjs/toolkit'
import { ReservaParaConsultaMensualDTO } from 'interfaces/reservasDelMes';

export const initialState: IInitialState = {
  diaMesArray: [],
  camasIdsArray: [],
  tabla: {},
}

const tablaDeReservasSlice = createSlice({
  name: 'tablaDeReservas',
  initialState,
  reducers: {
    inicializar: (state, { payload }) => {
      state.diaMesArray = payload.diaMesArray;
      state.camasIdsArray = payload.camasIdsArray;
      var celdaInicial: ICeldaInicial = {}; 

      payload.camasIdsArray.forEach((camaId: number) => celdaInicial[`${camaId}`] = {} as ReservaParaConsultaMensualDTO);
      payload.diaMesArray.forEach((diaMes: { dia: number; }) => state.tabla[`${diaMes.dia}`] = celdaInicial);
    },
    modificarCelda: (state, {payload}) => {
      state.tabla[`${payload.dia}`][`${payload.camaId}`] = payload.valor;
    },
    modificarPorReserva: (state, {payload}) => { 
      for (let dia = payload.diaInicio; dia <= payload.diaFin; dia++) {
        payload.camasIds.forEach((camaId: any) => {
          state.tabla[`${dia}`][`${camaId}`] = payload; 
        });
      }
    },
    _seleccionarTodasLasCeldasDeLaReserva: (state, {payload}) => { 
      Object.entries(state.tabla).forEach(([dia, camaIds]) => {
        Object.entries(camaIds).forEach(([camaId, celda]) => {
          if (celda.id === payload)
            celda.estaSeleccionada = true;
          else 
            celda.estaSeleccionada = false;
        });
      });

      
    },
  },
})

export const { inicializar, modificarCelda, modificarPorReserva, _seleccionarTodasLasCeldasDeLaReserva } = tablaDeReservasSlice.actions
export const tablaDeReservasSelector = (state: any) : IInitialState => state.tablaDeReservas
export default tablaDeReservasSlice.reducer

export function inicializarTabla(diaMesArray: IDiaMes[], camasIdsArray: number[]) {
  return async (dispatch: IDispatch) => {
    dispatch(inicializar({diaMesArray, camasIdsArray}));
  }
}

export function actualizarCelda(dia: number, camaId: number, valor: any) {
  return async (dispatch: IDispatch) => {
    dispatch(modificarCelda({dia, camaId, valor}));
  }
}

export function actualizarConReserva(reserva: ReservaParaConsultaMensualDTO) {
  return async (dispatch: IDispatch) => {
    dispatch(modificarPorReserva(reserva));
  }
}
export function seleccionarTodasLasCeldasDeLaReserva(reservaId: number) {
  return async (dispatch: IDispatch) => {
    dispatch(_seleccionarTodasLasCeldasDeLaReserva(reservaId));
  }
}

interface IInitialState {
  diaMesArray: IDiaMes[],
  camasIdsArray: number[],
  tabla: ITabla,
}

export interface ITabla {
  [dia: string]: {
    [camaId: string]: ReservaParaConsultaMensualDTO
  };
}

export interface ICeldaInicial {  
  [key: string]: ReservaParaConsultaMensualDTO;
}

export interface IDiaMes {
  dia: number,
  mes: number
}

export interface ICama {
  id: number,
  nombre: string,
  tipo: string
}

export interface IDispatch {
  (arg0: {
    payload: any,
    type: string,
  }): void;  
}



