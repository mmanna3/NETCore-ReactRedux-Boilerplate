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
      copy[payload.row][payload.column] = crearCelda(selectedOptions.FIRST);
      copy[payload.row+1][payload.column] = crearCelda(selectedOptions.NO, true);
      state.calendario = copy;
    },
    seleccionarUltimaCeldaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.column] = crearCelda(selectedOptions.LAST);
      state.calendario = copy;
    },
    seleccionarCeldaUnicaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.column] = crearCelda(selectedOptions.UNIQUE);
      state.calendario = copy;
    },
    seleccionarCeldaIntermediaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.column] = crearCelda(selectedOptions.YES);
      copy[payload.row+1][payload.column] = crearCelda(selectedOptions.NO, true);
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

export function seleccionarCeldaUnica(row, column) {
  return async dispatch => {
    dispatch(seleccionarCeldaUnicaAction({row, column}));
  }
}

export function seleccionarPrimeraCelda(row, column) {
  return async dispatch => {
    dispatch(seleccionarPrimeraCeldaAction({row, column}));
  }
}

export function seleccionarUltimaCelda(row, column) {
  return async dispatch => {
    dispatch(seleccionarUltimaCeldaAction({row, column}));
  }
}

export function seleccionarCeldaIntermedia(row, column) {
  return async dispatch => {
    dispatch(seleccionarCeldaIntermediaAction({row, column}));
  }
}