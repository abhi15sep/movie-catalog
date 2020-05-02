import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import placeholder from '../assets/placeholder.png'
import PropTypes from 'prop-types'

const MoviesListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`

const MoviesListItem = styled.div`
  cursor: pointer;
  width: 250px;
  border-radius: 10px; 
  margin: 25px 10px;
  transition: all 0.3s;

  :hover {
    transform: scale(1.05);
    box-shadow: 0 3px 3px rgba(0,0,0,0.16), 0 3px 3px rgba(0,0,0,0.23);
  }

  @media (max-width: 1000px) {
    width: 200px;
    transition: all 0.3s;
  }
`

const MovieLink = styled(Link)`
  text-decoration: none;
  color: #333;
`

const MoviePosterContainer = styled.div`
  position: relative; 
  height: calc(100% - 100px);
  overflow: hidden;
  border-radius: 10px 10px 0 0;

  @media (max-width: 1000px) {
    height: calc(100% - 80px);
  }
`

const MoviePoster = styled.img`
  display: block; 
  width: 100%; 
  min-height: 100%;
  margin: auto;
`

const MovieSubContainer = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  height: 100px;

  @media (max-width: 1000px) {
    height: 80px;
  }
`

const MovieSubTitle = styled.span`
  width: 90%;
  font-size: 16px;
  text-align: center;

  @media (max-width: 1000px) {
    font-size: 14px;
  }
`

const MovieRating = styled(MovieSubTitle)`
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
`

const MoviesList = ({ data }) => {
  return (
    <MoviesListContainer>
      {data && data.map(movie => {
        return (
          <MoviesListItem key={movie.id}>
            <MovieLink
              to={`/movies/${movie.id}`}
              data-id={movie.id}
            >
              <MoviePosterContainer>
                <MoviePoster src={movie.poster_path !== null ? `http://image.tmdb.org/t/p/w342${movie.poster_path}` : placeholder} alt='movie poster' />
              </MoviePosterContainer>
              <MovieSubContainer>
                <MovieSubTitle>{movie.title}</MovieSubTitle>
                <MovieRating>{!movie.vote_average ? (!movie.release_date ? 'NR' : movie.release_date) : movie.vote_average}</MovieRating>
              </MovieSubContainer>
            </MovieLink>
          </MoviesListItem>
        )
      })}
    </MoviesListContainer>
  )
}

MoviesList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number,
      release_date: PropTypes.string
    })
  ).isRequired
}

export default MoviesList