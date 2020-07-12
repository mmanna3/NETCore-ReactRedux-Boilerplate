import { combineReducers } from 'redux'

import habitacionesReducer from 'features/habitaciones/slice'
import crearHabitacionReducer from 'features/habitaciones/crear/slice'

import huespedesReducer from 'features/huespedes/slice'
import crearHuespedReducer from 'features/huespedes/crear/slice'


import loginReducer from 'features/login/slice'


import postsReducer from './posts'
import postReducer from './post'
import commentsReducer from './comments'


const rootReducer = combineReducers({
  login : loginReducer,
  
  habitaciones: habitacionesReducer,
  crearHabitacion : crearHabitacionReducer,
  
  huespedes: huespedesReducer,
  crearHuesped: crearHuespedReducer,

  
  posts: postsReducer,
  comments: commentsReducer,
  post: postReducer,
});

export default rootReducer;
