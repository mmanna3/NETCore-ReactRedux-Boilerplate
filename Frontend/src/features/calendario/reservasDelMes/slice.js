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
      copy[payload.row][payload.column] = {'selected':'first'};
      state.calendario = copy;
    },
    seleccionarCeldaUnicaAction: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.column] = {'selected':'unique'};
      state.calendario = copy;
    }
  },
})

export const { setState, seleccionarCeldaUnicaAction, seleccionarPrimeraCeldaAction } = reservasDelMesSlice.actions
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