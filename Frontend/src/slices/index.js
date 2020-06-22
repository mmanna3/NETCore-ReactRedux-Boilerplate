import { combineReducers } from 'redux'

import habitacionesReducer from 'features/habitaciones/slice'
import crearHabitacionReducer from 'features/habitaciones/crear/slice'

import postsReducer from './posts'
import postReducer from './post'
import commentsReducer from './comments'

const rootReducer = combineReducers({
  crearHabitacion : crearHabitacionReducer,
  habitaciones: habitacionesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  post: postReducer,
})

export default rootReducer
