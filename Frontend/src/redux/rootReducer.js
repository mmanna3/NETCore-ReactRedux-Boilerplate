import { combineReducers } from 'redux'

import habitacionesReducer from 'features/habitaciones/slice'
import habitacionesConLugaresLibresReducer from 'features/habitaciones/conLugaresLibresSlice'
import crearHabitacionReducer from 'features/habitaciones/crear/slice'

import huespedesReducer from 'features/huespedes/slice'
import crearHuespedReducer from 'features/huespedes/crear/slice'

//Borrar esto
import reservasDelMesReducer from 'features/calendario/reservasDelMes/slice'

import reservasReducer from 'features/reservas/slice'
import crearReservaReducer from 'features/reservas/crear/slice'


import loginReducer from 'features/login/slice'


const rootReducer = combineReducers({
  login: loginReducer,
  
  habitaciones: habitacionesReducer,
  habitacionesConLugaresLibres: habitacionesConLugaresLibresReducer,
  crearHabitacion : crearHabitacionReducer,  

  huespedes: huespedesReducer,
  crearHuesped: crearHuespedReducer,

  //Y esto
  reservasDelMes: reservasDelMesReducer,

  reservas: reservasReducer,
  crearReserva: crearReservaReducer
});

export default rootReducer;
