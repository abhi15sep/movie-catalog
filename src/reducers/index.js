import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import movieReducer from './movieReducer'
import optionsReducer from './optionsReducer'
import profileReducer from './profileReducer'
import searchReducer from './searchReducer'

export default combineReducers({ 
  movies: moviesReducer,
  movie: movieReducer,
  options: optionsReducer,
  profile: profileReducer,
  search: searchReducer
})