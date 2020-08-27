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
    updateACell: (state, {payload}) => {
      var copy = state.calendario;
      copy[payload.row][payload.column] = {'selected':'yes'};
      state.calendario = copy;
    }
  },
})

export const { setState, updateACell } = reservasDelMesSlice.actions
export const reservasDelMesSelector = state => state.reservasDelMes
export default reservasDelMesSlice.reducer

export function setInitialState(data) {
  return async dispatch => {
    dispatch(setState(data));
  }
}

export function updateCell(row, column) {
  return async dispatch => {
    dispatch(updateACell({row, column}));
  }
}