import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorNumber = styled.span`
  font-size: 15rem;
  line-height: 1;
  font-weight: 600;
  color: #eee;
`

const ErrorComment = styled.span`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`

const ErrorPage = () => {
  return (
    <Container>
      <ErrorContainer>
        <ErrorNumber>404</ErrorNumber>
        <ErrorComment>Page doesn't exist :(</ErrorComment>
      </ErrorContainer>
    </Container>
  )
}

export default ErrorPage