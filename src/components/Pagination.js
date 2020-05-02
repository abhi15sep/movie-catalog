import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  height: 80px;
  color: ${props => props.theme.colors.primary};
`

const PrimaryButton = styled.button`
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
  display: block;
  padding: 8px 20px;
  border-radius: 15px;
  font-family: 'Source Sans Pro', 'Roboto', sans-serif;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  transition: 0.2s;
  font-weight: 600;

  :disabled {
    opacity: 0;
    display: none;
  }

  :hover:enabled {
    border: 1px solid rgba(0,0,0,0.2);
    background: transparent;
    color: ${props => props.theme.colors.text};
    transform: scale(1.1);
  }
`

const PageInput = styled.input`
  text-align: center;
  font-weight: 600;
  outline: none;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 15px;
  padding: 8px;
  margin-right: 10px;
  color: ${props => props.theme.colors.primary};
`

const CenterPagination = styled.div`
  font-weight: 600;
`

const Pagination = ({ fetchData, page, totalPages, query = ''}) => {

  const [pageInput, setPageInput] = useState(page)

  const handleInputChange = (e) => {
    const val = e.currentTarget.value
    val > totalPages 
      ? setPageInput(totalPages) 
      : val < 0 
        ? setPageInput(1) 
        : setPageInput(val)
  }

  const handleInputPress = (e) => {
    if(e.keyCode <= 105 && e.keyCode >= 96){
      e.preventDefault()
    }
    if(e.key === 'Enter' && pageInput > 0) {
      query ? fetchData(pageInput, query) : fetchData(pageInput)
    }
  }

  return (
    <PaginationContainer>
      <PrimaryButton 
        onClick={() => query ? fetchData(page - 1, query) : fetchData(page - 1)}
        disabled={page === 1 ? true : false}
      >
        {`${page - 1}`}
      </PrimaryButton>
      <CenterPagination>
        <PageInput 
          type='number' 
          max={totalPages} 
          min={1} 
          placeholder={page} 
          value={pageInput}
          onChange={handleInputChange}
          onKeyPress={handleInputPress}
        /> 
        / {totalPages}
      </CenterPagination>
      <PrimaryButton 
        onClick={() => query ? fetchData(page + 1, query) : fetchData(page + 1)}
        disabled={page === totalPages ? true : false}
      >
        {`${page + 1}`}
      </PrimaryButton>
    </PaginationContainer>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  query: PropTypes.string,
  fetchData: PropTypes.func.isRequired
}

export default Pagination