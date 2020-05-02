import React, { useState, useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import MoviesPage from './MoviesPage'
import MoviePage from './MoviePage'
import ProfilePage from './ProfilePage'
import SearchPage from './SearchPage'
import ErrorPage from './ErrorPage'
import Sidebar from '../components/Sidebar'
import Burger from '../components/Burger'

const Container = styled.div`
  display: flex;
`

const SidebarContainer = styled.div`
  padding-top: 50px;
  padding-left: 50px;
  height: 100vh;
  overflow-y: scroll;
  width: 300px;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  transition: all 0.5s;

  @media (max-width: 1000px) {
    z-index: 98;
    left: ${props => props.toggled ? 0 : '-300px'};
    transition: all 0.5s;
    background: #fff;
  }
`

const MainContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  transition: all 0.5s;

  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
    margin-top: 50px;
  }
`

const Menu = styled.div`
  cursor: pointer;
  z-index: 99;
  position: fixed;
  top: 15px;
  left: -50px;

  @media (max-width: 1000px) {
    left: ${props => props.toggled ? '225px' : '20px'};
    transition: all 0.3s;
  }
`

const App = () => {

  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', handleWindow)
  })

  const handleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleWindow = () => {
    if (window.innerWidth >= 1000) {
      setToggleMenu(false)
    }
  }


  return (
    <Container>
      <Menu onClick={handleMenu} toggled={toggleMenu}>
        <Burger />
      </Menu>

      <SidebarContainer toggled={toggleMenu}>
        <Sidebar />
      </SidebarContainer>

      <MainContainer>
        <Switch>
          <Route exact path='/' component={MoviesPage} />
          <Route path='/movies/:id' component={(props) => <MoviePage timestamp={new Date().toString()} {...props} />} />
          <Route path='/profile/:id' component={ProfilePage} />
          <Route path='/search/:value' component={(props) => <SearchPage timestamp={new Date().toString()} {...props} />} />

          <Route component={ErrorPage} />
        </Switch>
      </MainContainer>
    </Container>
  )
}

export default withRouter(App)