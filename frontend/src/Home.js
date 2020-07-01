import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CategoriesList from './CategoriesList'

export default function Home({
  setCategorySelected,
  categorySelected,
  setSubcategorySelected,
}) {
  const [categories, setCategories] = useState([])
  const [selectedGender, setSelectedGender] = useState('female')

  useEffect(() => {
    fetch('http://localhost:8040/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, [])

  console.log(categories)
  return (
    <>
      <header>Categories</header>
      <main>
        <CenteredContainer>
          <div>
            <ParagraphWomen
              selectedGender={selectedGender}
              onClick={() => setSelectedGender('female')}
            >
              Women's
            </ParagraphWomen>
            <ParagraphMen
              selectedGender={selectedGender}
              onClick={() => setSelectedGender('male')}
            >
              Men's
            </ParagraphMen>
          </div>
          {selectedGender === 'female' &&
            categories
              .filter((category) => category.description === 'female')
              .map((category) => (
                <CategoriesList
                  category={category}
                  setCategorySelected={setCategorySelected}
                  setSubcategorySelected={setSubcategorySelected}
                  categorySelected={categorySelected}
                />
              ))}
          {selectedGender === 'male' &&
            categories
              .filter((category) => category.description === 'male')
              .map((category) => (
                <CategoriesList
                  category={category}
                  setCategorySelected={setCategorySelected}
                  setSubcategorySelected={setSubcategorySelected}
                  categorySelected={categorySelected}
                />
              ))}
        </CenteredContainer>
      </main>
    </>
  )
}

const CenteredContainer = styled.div`
  text-align: center;
  div {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 16px;
    margin-left: -4px;
    p {
      font-weight: 400;
      font-size: 20px;
      width: 187px;
      padding: 8px;
    }
  }
`

const ParagraphWomen = styled.p`
  background: ${(props) =>
    props.selectedGender === 'female'
      ? 'rgba(215, 206, 199, 1)'
      : 'rgba(215, 206, 199, 0.3)'};
  color: ${(props) =>
    props.selectedGender === 'female'
      ? 'rgba(86, 86, 86, 1)'
      : 'rgba(86, 86, 86, 0.7)'};
`

const ParagraphMen = styled.p`
  background: ${(props) =>
    props.selectedGender === 'male'
      ? 'rgba(215, 206, 199, 1)'
      : 'rgba(215, 206, 199, 0.3)'};
  color: ${(props) =>
    props.selectedGender === 'male'
      ? 'rgba(86, 86, 86, 1)'
      : 'rgba(86, 86, 86, 0.7)'};
`
