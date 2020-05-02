import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ErrorContainer = styled.div`
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorMessage = styled.h3`
  font-size: 30px;
  color: ${props => props.theme.colors.primary};
`

const Error = ({message}) => {
  return (
    <ErrorContainer>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  )
}

Error.propTypes = {
  message: PropTypes.string
}

export default Error