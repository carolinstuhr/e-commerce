import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Home({ clickCategory }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:8040/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])
  return (
    <>
      <header>Categories</header>
      <main>
        <CenteredContainer>
          <p>Women's</p>
          {categories
            .filter((category) => category.description === 'female')
            .map((category) => (
              <LinkStyled to="/products">
                <ButtonStyled onClick={() => clickCategory(category.id)}>
                  {category.name}
                </ButtonStyled>
              </LinkStyled>
            ))}
          <p>Men's</p>
          {categories
            .filter((category) => category.description === 'male')
            .map((category) => (
              <LinkStyled to="/products">
                <ButtonStyled onClick={() => clickCategory(category.id)}>
                  {category.name}
                </ButtonStyled>
              </LinkStyled>
            ))}
        </CenteredContainer>
      </main>
    </>
  )
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2,
  p {
    text-align: center;
    margin-top: 20px;
  }
  p {
    font-weight: 300;
    font-size: 18px;
    color: var(--secondary);
  }
`

const ButtonStyled = styled.button`
  background: var(--tertiary);
  color: var(--primary);
  border: none;
  padding: 8px;
  width: 300px;
  height: 50px;
  margin-top: 8px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 200;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #ecebea;
`
