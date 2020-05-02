import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSearch } from '../actions'
import Spinner from '../components/Spinner'
import Error from '../components/Error'
import MoviesList from '../components/MoviesList'
import Pagination from '../components/Pagination'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SearchPageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchSubtitle = styled.h3`
  font-size: 16px;
`

const SearchQuery = styled.span`
  font-size: 16px;
  color: ${props => props.theme.colors.primary};
`

const SearchPage = ({ fetchSearch, search, match }) => {

  const { results, page, total_pages, loading } = search

  useEffect(() => {
    fetchSearch(1, match.params.value)
  }, [])

  if (loading) {
    return <Spinner size={100} loading={loading} />
  } else if (results === undefined || results.length === 0) {
    return (
      <Error message='No Results Found.' />
    )
  } else {
    return (
      <SearchPageContainer>
        <Pagination fetchData={fetchSearch} page={page} totalPages={total_pages} query={match.params.value} />
        <TitleContainer>
          <SearchSubtitle>Results for '<SearchQuery>{match.params.value}</SearchQuery>'</SearchSubtitle>
        </TitleContainer>
        <MoviesList data={results} />
        <Pagination fetchData={fetchSearch} page={page} totalPages={total_pages} query={match.params.value} />
      </SearchPageContainer>
    )
  }

}

const mapStateToProps = (state) => ({
  search: state.search
})

const mapDispatchToProps = {
  fetchSearch
}

SearchPage.propTypes = {

  search: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired, 
    page: PropTypes.number.isRequired, 
    total_pages: PropTypes.number.isRequired
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,

  fetchSearch: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)