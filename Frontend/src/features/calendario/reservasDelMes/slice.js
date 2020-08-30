import { createSlice } from '@reduxjs/toolkit'
import { selectedOptions } from './consts'

export const initialState = {
  calendario: [],
}

const reservasDelMesSlice = createSlice({
  name: 'reservasDelMes',
  initialState,
  reducers: {
    setState: (state, { payload }) => {
      state.calendario = payload
    },
    seleccionarPrimeraCeldaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.col] = crearCelda(selectedOptions.FIRST);
      copy[payload.row+1][payload.col] = crearCelda(selectedOptions.NO, true);
      state.calendario = copy;
    },
    seleccionarUltimaCeldaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.col] = crearCelda(selectedOptions.LAST);
      
      state.calendario = copy;
    },
    seleccionarCeldaUnicaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.col] = crearCelda(selectedOptions.UNIQUE);
      state.calendario = copy;
    },
    seleccionarCeldaIntermediaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.col] = crearCelda(selectedOptions.YES);
      copy[payload.row+1][payload.col] = crearCelda(selectedOptions.NO, true);
      state.calendario = copy;
    }
  },
})

function crearCelda(selected, canBeSelected = false) {
  return {
    selected: selected,
    canBeSelected: canBeSelected
  }
}


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