import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
                <>
                  {category.subcategories.length === 0 ? (
                    <LinkStyled to="/products">
                      <ButtonStyled
                        onClick={() => setSelectedCategories(category.id, 0)}
                      >
                        {category.name}
                      </ButtonStyled>
                    </LinkStyled>
                  ) : (
                    <>
                      <ButtonStyled
                        onClick={() => setCategorySelected(category.id)}
                      >
                        {category.name}
                      </ButtonStyled>
                      {categorySelected === category.id &&
                        category.subcategories.map((subcategory) => (
                          <LinkStyled to="/products">
                            <p
                              onClick={() =>
                                setSubcategorySelected(subcategory.id)
                              }
                            >
                              {subcategory.name}
                            </p>
                          </LinkStyled>
                        ))}
                    </>
                  )}
                </>
              ))}
          {selectedGender === 'male' &&
            categories
              .filter((category) => category.description === 'male')
              .map((category) => (
                <>
                  {category.subcategories.length === 0 ? (
                    <LinkStyled to="/products">
                      <ButtonStyled
                        onClick={() => setSelectedCategories(category.id, 0)}
                      >
                        {category.name}
                      </ButtonStyled>
                    </LinkStyled>
                  ) : (
                    <>
                      <ButtonStyled
                        onClick={() => setCategorySelected(category.id)}
                      >
                        {category.name}
                      </ButtonStyled>
                      {categorySelected === category.id &&
                        category.subcategories.map((subcategory) => (
                          <LinkStyled to="/products">
                            <p
                              onClick={() =>
                                setSubcategorySelected(subcategory.id)
                              }
                            >
                              {subcategory.name}
                            </p>
                          </LinkStyled>
                        ))}
                    </>
                  )}
                </>
              ))}
        </CenteredContainer>
      </main>
    </>
  )

  function setSelectedCategories(categoryId, subcategoryID) {
    setCategorySelected(categoryId)
    setSubcategorySelected(subcategoryID)
  }
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

const ButtonStyled = styled.button`
  display: block;
  background: var(--tertiary);
  color: var(--primary);
  border: none;
  padding: 8px;
  width: 100%;
  margin-left: -4px;
  height: 50px;
  margin-top: 8px;

  font-size: 18px;
  font-weight: 300;
  font-family: 'Inconsolata', monospace;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #ecebea;
`
