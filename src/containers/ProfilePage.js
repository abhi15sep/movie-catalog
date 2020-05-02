import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProfile } from '../actions'
import placeholder from '../assets/placeholder.png'
import Spinner from '../components/Spinner'
import MoviesList from '../components/MoviesList'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ProfilePageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`

const ProfileInfoContainer = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  line-height: 3;

  @media (max-width: 600px) {
    text-align: center;
  }
`

const ProfileImgContainer = styled.div`
  max-width: 182px;

  @media (max-width: 600px) {
    margin: 0 auto;
  }
`

const ProfileImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

const BioText = styled.p`
  margin-top: 20px;
  max-width: 500px;
`

const ProfileInfo = styled.div`
  margin-left: 50px;

  @media (max-width: 600px) {
    margin-left: 0;
    aling-items: center;
    text-align: center;
  }
`

const ProfilePage = ({ profile, fetchProfile, match }) => {
  const { info, starring, loading } = profile

  useEffect(() => {
    fetchProfile(match.params.id)
  }, [])

  if (loading) {
    return (
      <Spinner size={100} loading={loading} />
    )
  } else {
    return (
      <ProfilePageContainer>
        <ProfileInfoContainer>
          <ProfileImgContainer>
            <ProfileImg src={info.profile_path ? `https://image.tmdb.org/t/p/w185${info.profile_path}` : placeholder} alt={info.name} />
          </ProfileImgContainer>
          <ProfileInfo>
            <h1>{info.name}</h1>
            <BioText>{info.biography}</BioText>
          </ProfileInfo>
        </ProfileInfoContainer>
        {starring.cast.length > 0
          ? (
            <div>
              <Title>Also starred in</Title>
              <MoviesList data={starring.cast} />
            </div>
          )
          : null
        }
      </ProfilePageContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

const mapDispatchToProps = {
  fetchProfile
}

ProfilePage.propTypes = {
  profile: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    info: PropTypes.object.isRequired,
    starring: PropTypes.object.isRequired
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  
  fetchProfile: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)