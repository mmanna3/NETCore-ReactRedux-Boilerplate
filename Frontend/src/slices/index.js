import { combineReducers } from 'redux'

import habitacionesReducer from './habitaciones'
import postsReducer from './posts'
import postReducer from './post'
import commentsReducer from './comments'

const rootReducer = combineReducers({
  habitaciones: habitacionesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  post: postReducer,
})

export default rootReducer
