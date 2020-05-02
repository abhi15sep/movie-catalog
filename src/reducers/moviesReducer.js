import { FETCH_MOVIES_BEGIN, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR } from '../actions/types'

const initialState = {
  loading: true,
  page: 0,
  total_results: 0,
  total_pages: 0,
  results: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_MOVIES_BEGIN:
    return {
      ...state,
      loading: true
    }

  case FETCH_MOVIES_SUCCESS:
    return {
      loading: false,
      page: action.payload.page,
      total_results: action.payload.total_results,
      total_pages: action.payload.total_pages,
      results: [...action.payload.results]
    }

  case FETCH_MOVIES_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload
    }

  default:
    return state
  }
}