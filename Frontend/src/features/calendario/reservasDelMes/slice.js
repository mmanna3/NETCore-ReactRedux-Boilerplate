import { createSlice } from '@reduxjs/toolkit'

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
      copy[payload.row][payload.column] = crearCelda('first');
      copy[payload.row+1][payload.column] = crearCelda('no', true);
      state.calendario = copy;
    },
    seleccionarCeldaUnicaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.column] = crearCelda('unique');
      state.calendario = copy;
    },
    seleccionarCeldaIntermediaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.column] = crearCelda('yes');
      copy[payload.row+1][payload.column] = crearCelda('no', true);
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


export const { setState, seleccionarCeldaUnicaAction, seleccionarPrimeraCeldaAction, seleccionarCeldaIntermediaAction } = reservasDelMesSlice.actions
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

export function seleccionarCeldaIntermedia(row, column) {
  return async dispatch => {
    dispatch(seleccionarCeldaIntermediaAction({row, column}));
  }
}