import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { actualizarUsuarioEnLocalStorage } from 'features/login/servicio'

export const initialState = {
  loading: false,
  requestData: '',
  responseData: '',
  validationErrors: undefined
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    postInit: (state, { payload }) => {
      state.loading = true
      state.requestData = payload
    },
    postSuccess: state => {
      state.loading = false
      state.validationErrors = undefined
    },
    postFailure: (state, {payload}) => {
      state.loading = false
      state.validationErrors = payload?.errors
    },
    reset: (state) => {
      state.loading = false
      state.responseData = ''
      state.requestData = ''
      state.validationErrors = undefined
    },
  },
})

export const { postInit, postSuccess, postFailure, reset } = loginSlice.actions
export const loginSelector = state => state.login
export default loginSlice.reducer

export function login(data, onSuccess) {

  return async dispatch => {
    dispatch(postInit(data));

    axios.post('/api/usuarios/autenticar', data)
      .then((res) => {        
        actualizarUsuarioEnLocalStorage(res.data);        
        dispatch(postSuccess(res.data));
        onSuccess();
      })
      .catch((error) => {
          dispatch(postFailure(error.response.data));
      })
  }
}

export function cleanErrors() {
  
  return async dispatch => {
    dispatch(reset());
  }
}
