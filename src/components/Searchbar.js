import React from 'react'
import { connect } from 'react-redux'
import { changeSearchInput } from '../actions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  outline: 0;
  border: 1px solid rgba(0,0,0,0.2);
  width: 150px;
  height: 30px;
  border-radius: 15px;
  padding: 5px 15px;
`

const SearchButton = styled(Link)`
  text-decoration: none;
  margin-left: 10px;
  color: ${props => props.theme.colors.primary};

  :hover {
    text-decoration: underline;
  }
`

const Searchbar = ({ search, changeSearchInput }) => {

  const handleSearchInput = (e) => {
    changeSearchInput(e.target.value)
  }

  return (
    <SearchContainer>
      <label htmlFor='search'>
        <SearchInput name='search' type='text' onChange={handleSearchInput} value={search.input} />
        <SearchButton to={`/search/${search.input}`}>Search</SearchButton>
      </label>
    </SearchContainer>
  )
}

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = {
  changeSearchInput
}

Searchbar.propTypes = {

  search: PropTypes.shape({
    input: PropTypes.string
  }).isRequired,

  changeSearchInput: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)