import React from 'react'
import styled from 'styled-components'

const BurgerContainer = styled.div`
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BurgerLine = styled.div`
  width: 100%;
  height: 3px;
  background: ${props => props.theme.colors.primary};
  margin: 3px 0;
`

const Burger = () => {
  return (
    <BurgerContainer>
      <BurgerLine />
      <BurgerLine />
      <BurgerLine />
    </BurgerContainer>
  )
}

export default Burger


