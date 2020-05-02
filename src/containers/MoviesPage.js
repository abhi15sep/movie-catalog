import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchMovies } from '../actions'
import Pagination from '../components/Pagination'
import MoviesList from '../components/MoviesList'
import Spinner from '../components/Spinner'
import Error from '../components/Error'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const MoviesPageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`

const MoviesPage = ({ movies, fetchMovies }) => {

  const { page, total_pages, results, error, loading } = movies

  useEffect(() => {
    fetchMovies()
  }, [])

  if (loading === true) {
    return <Spinner size={100} loading={loading} />
  } else if (error) {
    return <Error message={error} />
  } else if (results.length === 0) {
    return  <Error message='No Results Found.' />
  } else {
    return (
      <MoviesPageContainer>
        <Pagination fetchData={fetchMovies} page={page} totalPages={total_pages} />
        <MoviesList data={results} />
        <Pagination fetchData={fetchMovies} page={page} totalPages={total_pages} />
      </MoviesPageContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
})

const mapDispatchToProps = {
  fetchMovies
}


MoviesPage.propTypes = {
  movies: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  
  fetchMovies: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage)