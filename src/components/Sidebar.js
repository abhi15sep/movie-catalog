import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchGenres, selectSort, selectGenres } from '../actions'
import Searchbar from './Searchbar'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`

const ListContainer = styled.div`
  margin-top: 30px;
`

const OptionTitle = styled.h3`
  text-transform: uppercase;
  line-height: 3;
  color: ${props => props.theme.colors.primary};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const ListLink = styled(Link)`
  cursor: default;
  text-decoration: none;
  line-height: 3;
  color: ${props => props.theme.colors.text};
`

const LogoLink = styled(Link)`
  font-family: 'Source Sans Pro', sans-serif;
  text-decoration: none;
  color: #000;
  font-size: 26px;
  line-height: 0;
  margin-bottom: 30px;
  font-weight: 800;
  text-transform: uppercase;
`

const ListItemText = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 150px;
  height: 30px;
  font-weight: ${props => props.selected ? 600 : 400};
  border: ${props => props.selected ? '1px solid rgba(0,0,0,0.2)' : '1px solid transparent'};
  border-radius: 15px;
  padding: 5px 15px;
  margin-bottom: 5px;

  :hover {
    border: ${props => props.selected ? '1px solid rgba(0,0,0,0.2)' : '1px solid #eee'};
  }
`

const Sidebar = ({ fetchGenres, options, selectGenres, selectSort }) => {

  const { genres, sortBy } = options

  useEffect(() => {
    fetchGenres()
  }, [])

  const handleSortSelection = (e) => {
    if (e.target.getAttribute('data-type') === 'sort') {
      selectSort(e.target.getAttribute('data-query'))
    }
  }

  const handleGenresSelection = (e) => {
    if (e.target.getAttribute('data-type') === 'genre') {
      selectGenres(e.target.getAttribute('data-query'))
    }
  }

  return (
    <Container>
      <LogoLink to='/'>Movie-Catalog</LogoLink>
      <Searchbar />
      <ListContainer>
        <OptionTitle>Sort By</OptionTitle>
        <List>
          {sortBy && sortBy.map(el => {
            return (
              <ListLink
                to='/'
                key={el.query}
              >
                <ListItemText
                  selected={el.selected}
                  onClick={handleSortSelection}
                  data-query={el.query}
                  data-type='sort'
                >
                  {el.name}
                </ListItemText>
              </ListLink>
            )
          })}
        </List>
      </ListContainer>
      <ListContainer>
        <OptionTitle>Genres</OptionTitle>
        <List>
          {genres && Object.keys(genres).map(i => {
            return (
              <ListLink
                to='/'
                key={genres[i].id}
              >
                <ListItemText
                  selected={genres[i].selected}
                  data-query={genres[i].id}
                  data-type='genre'
                  onClick={handleGenresSelection}
                >
                  {genres[i].name}
                </ListItemText>
              </ListLink>
            )
          })}
        </List>
      </ListContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  options: state.options
})

const mapDispatchToProps = {
  fetchGenres,
  selectSort,
  selectGenres,
}

Sidebar.propTypes = {

  options: PropTypes.shape({
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired
      })
    ).isRequired,
    sortBy: PropTypes.arrayOf(
      PropTypes.shape({
        query: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired
      })
    ).isRequired
  }).isRequired,

  fetchGenres: PropTypes.func.isRequired,
  selectGenres: PropTypes.func.isRequired,
  selectSort: PropTypes.func.isRequired,

}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)