import { createSlice } from '@reduxjs/toolkit'
import { selectedOptions } from './consts'

export const initialState = {
  calendario: [],
  selectionHasStarded: false,
  primeraCeldaSeleccionada: {},
  ultimaCeldaSeleccionada: {}
}

const reservasDelMesSlice = createSlice({
  name: 'reservasDelMes',
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      state.calendario = payload
    },
    seleccionarPrimeraCeldaAction: (state, {payload}) => {
      var celda = state.calendario[payload.row][payload.col];
      
      if (celda.selected === selectedOptions.NO) {
        celda.selected = selectedOptions.FIRST;
                
        var celdaDeAbajo = state.calendario[payload.row+1][payload.col];
        if (celdaDeAbajo.selected === selectedOptions.NO)
          celdaDeAbajo.canBeSelected = true;
        
        var celdaDeLaDerecha = state.calendario[payload.row][payload.col+1];
        if (celdaDeLaDerecha.selected === selectedOptions.NO)
          celdaDeLaDerecha.canBeSelected = true;

        state.primeraCeldaSeleccionada = {row: payload.row, col: payload.col};
        
        state.selectionHasStarded = true;
      }
    },
    seleccionarUltimaCeldaAction: (state, {payload}) => {
      state.calendario[payload.row][payload.col] = crearCelda(selectedOptions.LAST);
      state.selectionHasStarded = false;
    },
    seleccionarCeldaUnicaAction: (state, {payload}) => {
      state.calendario[payload.row][payload.col] = crearCelda(selectedOptions.UNIQUE);
    },
    seleccionarCeldaIntermediaAction: (state, {payload}) => {
      var celda = state.calendario[payload.row][payload.col];
      
      if (state.selectionHasStarded && celda.canBeSelected) {
        celda.selected = selectedOptions.YES;
        celda.canBeSelected = false;        
        
        var celdaDeAbajo = state.calendario[payload.row+1][payload.col];
        if (celdaDeAbajo.selected === selectedOptions.NO)
          celdaDeAbajo.canBeSelected = true;
        
        var celdaDeLaDerecha = state.calendario[payload.row][payload.col+1];
        if (celdaDeLaDerecha.selected === selectedOptions.NO)
          celdaDeLaDerecha.canBeSelected = true;

        state.ultimaCeldaSeleccionada = {row: payload.row, col: payload.col};
      }      
    }
  },
})

function crearCelda(selected, canBeSelected = false) {
  return {
    selected: selected,
    canBeSelected: canBeSelected
  }
}

// function modificarCelda(celda, prop, val) {
//   return {
//     selected: selected,
//     canBeSelected: canBeSelected
//   }
// }


export const { setState, seleccionarCeldaUnicaAction, seleccionarPrimeraCeldaAction, seleccionarUltimaCeldaAction, seleccionarCeldaIntermediaAction } = reservasDelMesSlice.actions
export const reservasDelMesSelector = state => state.reservasDelMes
export default reservasDelMesSlice.reducer

export function setInitialState(data) {
  return async dispatch => {
    dispatch(setState(data));
  }
}

export function seleccionarCeldaUnica(row, col) {
  return async dispatch => {
    dispatch(seleccionarCeldaUnicaAction({row, col}));
  }
}

export function seleccionarPrimeraCelda(row, col) {
  return async dispatch => {
    dispatch(seleccionarPrimeraCeldaAction({row, col}));
  }
}

export function seleccionarUltimaCelda(row, col) {
  return async dispatch => {
    dispatch(seleccionarUltimaCeldaAction({row, col}));
  }
}

export function seleccionarCeldaIntermedia(row, col) {
  return async dispatch => {
    dispatch(seleccionarCeldaIntermediaAction({row, col}));
  }
}