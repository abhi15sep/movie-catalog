import { FETCH_SEARCH_BEGIN, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR, CHANGE_SEARCH_INPUT } from '../actions/types'

const initialState = {
  loading: true,
  input: '',
  page: 0,
  total_pages: 0,
  results: [],
  total_results: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_SEARCH_INPUT:
    return {
      ...state,
      loading: false,
      input: action.payload
    }

  case FETCH_SEARCH_BEGIN:
    return {
      ...state,
      loading: true
    }

  case FETCH_SEARCH_SUCCESS:
    return {
      ...state,
      loading: false,
      input: '',
      page: action.payload.page,
      total_results: action.payload.total_results,
      total_pages: action.payload.total_pages,
      results: [...action.payload.results]
    }

  case FETCH_SEARCH_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload
    }

  default:
    return state
  }
}