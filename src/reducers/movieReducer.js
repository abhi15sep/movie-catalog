import { FETCH_MOVIE_BEGIN, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR } from '../actions/types'

const initialState = {
  loading: true,
  info: {},
  people: {},
  recommend: {},
  video: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_MOVIE_BEGIN:
    return {
      ...state,
      loading: true
    }

  case FETCH_MOVIE_SUCCESS:
    return {
      loading: false,
      info: { ...action.payload.info },
      people: { ...action.payload.people },
      recommend: { ...action.payload.recommend },
      video: { ...action.payload.video }
    }

  case FETCH_MOVIE_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload
    }

  default:
    return state
  }
}