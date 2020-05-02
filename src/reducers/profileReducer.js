import { FETCH_PROFILE_BEGIN, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR } from '../actions/types'

const initialState = {
  loading: true,
  info: {},
  starring: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PROFILE_BEGIN:
    return {
      ...state,
      loading: true
    }

  case FETCH_PROFILE_SUCCESS:
    return {
      loading: false,
      info: { ...action.payload.info },
      starring: { ...action.payload.starring }
    }

  case FETCH_PROFILE_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload
    }

  default:
    return state
  }
}