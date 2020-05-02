import tmdbAPI from '../api/tmdb'
import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  FETCH_GENRES,
  FETCH_GENRES_ERROR,
  SELECT_GENRES,
  SELECT_SORT,
  FETCH_MOVIE_BEGIN,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_ERROR,
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  FETCH_SEARCH_BEGIN,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR,
  CHANGE_SEARCH_INPUT
} from './types'





// FETCH ALL GENRES FROM DB

export const fetchGenres = () => dispatch => {
  return tmdbAPI.get('/genre/movie/list')
    .then(res => {
      const data = res.data.genres.map(genre => {
        return genre = { ...genre, selected: false }
      })
      dispatch({
        type: FETCH_GENRES,
        payload: data
      })
    }).catch(error => {
      dispatch({
        type: FETCH_GENRES_ERROR,
        payload: error.message
      })
    })
}







// FETCH ALL MOVIES WITH SELECTED OPTIONS

export const fetchMoviesBegin = () => ({
  type: FETCH_MOVIES_BEGIN
})


export const fetchMovies = (page = 1) => {
  return (dispatch, getState) => {
    dispatch(fetchMoviesBegin())
    let params = {}
    const sort = getState().options.sortBy
    const genres = getState().options.genres

    const selectedSort = sort.find(el => el.selected === true)

    const selectedGenres = genres
      .filter(genre => genre.selected === true)
      .map(el => el.id)

    if (selectedGenres.length > 0 && !selectedGenres.includes(9999)) {
      params = {
        with_genres: selectedGenres.join(','),
        sort_by: selectedSort.query,
        page: page
      }
    } else {
      params = {
        sort_by: selectedSort.query,
        page: page
      }
    }

    return tmdbAPI.get('/discover/movie', { params })
      .then(res => {
        dispatch({
          type: FETCH_MOVIES_SUCCESS,
          payload: res.data
        })
      }).catch(error => {
        dispatch({
          type: FETCH_MOVIES_ERROR,
          payload: error.message
        })
      })
  }
}


export const selectSort = sortQuery => dispatch => {
  dispatch({
    type: SELECT_SORT,
    payload: sortQuery
  })

  dispatch(fetchMovies())
}

export const selectGenres = genreId => dispatch => {
  dispatch({
    type: SELECT_GENRES,
    payload: genreId
  })

  dispatch(fetchMovies())
}









// FETCHING MOVIE BY ID

export const fetchMovieBegin = () => ({
  type: FETCH_MOVIE_BEGIN
})

export const fetchMovieSuccess = (info, people, recommend, video) => ({
  type: FETCH_MOVIE_SUCCESS,
  payload: {
    info: info.data,
    people: people.data,
    recommend: recommend.data,
    video: video.data,
  }
})

export const fetchMovieError = (error) => ({
  type: FETCH_MOVIE_ERROR,
  payload: error.message
})

export const fetchMovie = (movieId) => {
  return async (dispatch) => {
    dispatch(fetchMovieBegin())
    const infoPromise = await tmdbAPI.get(`/movie/${movieId}`)
    const peoplePromise = await tmdbAPI.get(`/movie/${movieId}/credits`)
    const recommendPromise = await tmdbAPI.get(`/movie/${movieId}/recommendations`)
    const videoPromise = await tmdbAPI.get(`/movie/${movieId}/videos`)
    await Promise.all([infoPromise, peoplePromise, recommendPromise, videoPromise])
      .then(([info, people, recommend, video]) => dispatch(fetchMovieSuccess(info, people, recommend, video)))
      .catch(error => dispatch(fetchMovieError(error)))
  }
}






// FETCHING PROFILE OF SPECIFIC CAST MEMBER

export const fetchProfileBegin = () => ({
  type: FETCH_PROFILE_BEGIN
})

export const fetchProfileSuccess = (info, starring) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: {
    info: info.data,
    starring: starring.data
  }
})

export const fetchProfileError = (error) => ({
  type: FETCH_PROFILE_ERROR,
  payload: error.message
})

export const fetchProfile = (profileId) => {
  return async (dispatch) => {
    dispatch(fetchProfileBegin())
    const infoPromise = await tmdbAPI.get(`/person/${profileId}`)
    const starringPromise = await tmdbAPI.get(`/person/${profileId}/movie_credits`)
    await Promise.all([infoPromise, starringPromise])
      .then(([info, starring]) => dispatch(fetchProfileSuccess(info, starring)))
      .catch(error => dispatch(fetchProfileError(error)))
  }
}










// FETCHING SEARCH INPUT

export const changeSearchInput = (val) => ({
  type: CHANGE_SEARCH_INPUT,
  payload: val
})

export const fetchSearchBegin = () => ({
  type: FETCH_SEARCH_BEGIN
})

export const fetchSearchSuccess = (search) => ({
  type: FETCH_SEARCH_SUCCESS,
  payload: search.data
})

export const fetchSearchError = (error) => ({
  type: FETCH_SEARCH_ERROR,
  payload: error.message
})

export const fetchSearch = (page = 1, query) => {
  return async (dispatch) => {
    dispatch(fetchSearchBegin())

    const params = {
      query: query,
      page: page
    }
    const searchPromise = await tmdbAPI.get('/search/movie', { params })
    await Promise.all([searchPromise])
      .then(([search]) => dispatch(fetchSearchSuccess(search)))
      .catch(error => dispatch(fetchSearchError(error)))
  }
}