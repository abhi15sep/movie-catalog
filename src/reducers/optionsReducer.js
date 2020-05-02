import { FETCH_GENRES, FETCH_GENRES_ERROR, SELECT_GENRES, SELECT_SORT } from '../actions/types'

const initialState = {
  genres: [
    { id: 9999, name: 'All Movies', selected: true }
  ],
  sortBy: [
    {
      name: 'Popularity',
      query: 'popularity.desc',
      selected: true
    },
    {
      name: 'Ratings',
      query: 'vote_average.desc',
      selected: false
    },
    {
      name: 'Release',
      query: 'release_date.desc',
      selected: false
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
  
  case FETCH_GENRES:
    return {
      ...state,
      genres: [...state.genres, ...action.payload]
    }

  case FETCH_GENRES_ERROR:
    return {
      ...state,
      error: action.payload
    }

  case SELECT_SORT:
    let matchingSort = state.sortBy.find(el => el.query === action.payload)
    let selectedSort = state.sortBy.find(el => el.selected === true)
    let restOfSorts = state.sortBy.filter(el => el.query !== action.payload)

    if (matchingSort.query === selectedSort.query) {
      return state
    } else if (matchingSort.selected === false) {
      restOfSorts = restOfSorts.map(el => {
        return {
          ...el,
          selected: false
        }
      })
      matchingSort.selected = true
    }

    let newSort = [...restOfSorts, matchingSort]
      .sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })

    return {
      ...state,
      sortBy: [...newSort]
    }

  case SELECT_GENRES:
    const allGenres = state.genres.find(el => el.name === 'All Movies')
    let matchingGenre = state.genres.find(el => el.id === parseInt(action.payload))
    let genresWithoutMatching = state.genres.filter(el => el.id !== parseInt(action.payload))

    if (matchingGenre.id === allGenres.id && matchingGenre.selected === true) {
      return state
    } else if (matchingGenre.id === allGenres.id && matchingGenre.selected === false) {
      genresWithoutMatching = genresWithoutMatching.map(el => {
        return {
          ...el,
          selected: false
        }
      })
      matchingGenre.selected = true
    } else if (matchingGenre.id !== allGenres.id && matchingGenre.selected === true) {
      matchingGenre.selected = false
    } else if (matchingGenre.id !== allGenres.id && matchingGenre.selected === false) {
      allGenres.selected = false
      matchingGenre.selected = true
    }

    let newGenres = [...genresWithoutMatching, matchingGenre]
      .sort((a, b) => {
        if (a.name === 'All Movies') return -1
        if (b.name === 'All Movies') return 1
        return a.name > b.name ? 1 : -1
      })

    return {
      ...state,
      genres: [...newGenres]
    }

  default:
    return state
  }
}