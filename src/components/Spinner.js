import React from 'react'
import styled from 'styled-components'
import { ImpulseSpinner } from 'react-spinners-kit'
import theme from '../styles/theme'
import PropTypes from 'prop-types'

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Spinner = ({ size, loading }) => {
  return (
    <SpinnerContainer>
      <ImpulseSpinner size={size} color={theme.colors.primary} loading={loading} />
    </SpinnerContainer>
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
  loading: PropTypes.bool.isRequired
}

export default Spinner