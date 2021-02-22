import { combineReducers } from 'redux'

//Para Matías del futuro:
//Hoy opino que todos estos archivos deberían estar en la misma carpeta.
//Pensalo.

import habitacionesReducer from 'features/habitaciones/slice'
import habitacionesConLugaresLibresReducer from 'features/habitaciones/conLugaresLibresSlice'
import crearHabitacionReducer from 'features/habitaciones/crear/slice'
import obtenerHabitacionPorIdReducer from 'features/habitaciones/detalle/slice'

import huespedesReducer from 'features/huespedes/slice'
import crearHuespedReducer from 'features/huespedes/crear/slice'


import tablaDeReservas from 'features/reservas/Tabla/slice'

import reservasReducer from 'features/reservas/slice'
import crearReservaReducer from 'features/reservas/crear/slice'
import checkoutsDeHoy from 'features/reservas/CheckoutsDeHoy/slice'


import loginReducer from 'features/login/slice'




const rootReducer = combineReducers({
  login: loginReducer,
  
  habitaciones: habitacionesReducer,
  habitacionesConLugaresLibres: habitacionesConLugaresLibresReducer,
  crearHabitacion : crearHabitacionReducer,  

  huespedes: huespedesReducer,
  crearHuesped: crearHuespedReducer,

  tablaDeReservas: tablaDeReservas,

  reservas: reservasReducer,
  crearReserva: crearReservaReducer,
  obtenerHabitacionPorId: obtenerHabitacionPorIdReducer,
  checkoutsDeHoy: checkoutsDeHoy,
});

export default rootReducer;
