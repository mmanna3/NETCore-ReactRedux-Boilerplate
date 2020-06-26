import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
  loading: false,
  hasSuccess: false,
  hasErrors: false,
  hasFinished: false,
  requestData: '',
  responseData: '',
  validationErrors: []
}

const crearHabitacionSlice = createSlice({
  name: 'crearHabitacion',
  initialState,
  reducers: {
    post: (state, { payload }) => {
      state.loading = true
      state.hasSuccess = false
      state.hasErrors = false
      state.hasFinished = false
      state.responseData = ''
      state.validationErrors = []
      state.requestData = payload
    },
    postSuccess: state => {
      state.loading = false
      state.hasSuccess = true
    },
    postFailure: (state, {payload}) => {
      state.loading = false
      state.hasErrors = true
      state.validationErrors = payload?.errors
    },
    postFinished: (state) => {      
      state.loading = false
      state.hasSuccess = false
      state.hasErrors = false
      state.hasFinished = true
      state.responseData = ''
      state.validationErrors = []
      state.requestData = ''
    },
  },
})

export const { post, postSuccess, postFailure, postFinished } = crearHabitacionSlice.actions
export const crearHabitacionSelector = state => state.crearHabitacion
export default crearHabitacionSlice.reducer

export function crearHabitacion(data) {

  return async dispatch => {
    dispatch(post(data));

    axios.post('/api/habitaciones', data)
      .then((res) => {
        dispatch(postSuccess(res.data));
      })
      .catch((error) => {
          dispatch(postFailure(error.response.data));
      })
      .then(() => {
        dispatch(postFinished());
      })
  }
}
