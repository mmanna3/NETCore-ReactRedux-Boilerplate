import { createSlice } from '@reduxjs/toolkit'
import { IReserva } from 'interfaces/reserva';

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

      payload.camasIdsArray.forEach((camaId: number) => celdaInicial[`${camaId}`] = "");
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
  },
})

export const { inicializar, modificarCelda, modificarPorReserva } = tablaDeReservasSlice.actions
export const tablaDeReservasSelector = (state: any) => state.tablaDeReservas
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

export function actualizarConReserva(reserva: IReserva) {
  return async (dispatch: IDispatch) => {
    dispatch(modificarPorReserva(reserva));
  }
}

interface IInitialState {
  diaMesArray: number[],
  camasIdsArray: number[],
  tabla: ITabla,
}

export interface ITabla {
  [key: string]: {
    [key: string]: string
  };
}

export interface ICeldaInicial {  
  [key: string]: string;
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



