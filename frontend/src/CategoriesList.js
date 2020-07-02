import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function CategoriesList({
  category,
  setCategorySelected,
  setSubcategorySelected,
  categorySelected,
}) {
  const [isSubcategoryVisible, setIsSubcategoryVisible] = useState(false)

  return (
    <>
      {category.subcategories.length === 0 ? (
        <LinkStyled to="/products">
          <ButtonStyled onClick={() => setSelectedCategories(category.id, 0)}>
            {category.name}
          </ButtonStyled>
        </LinkStyled>
      ) : (
        <>
          <ButtonStyled onClick={() => subcategoryVisible(category.id)}>
            {category.name}
          </ButtonStyled>
          {categorySelected === category.id && isSubcategoryVisible && (
            <StyledSection>
              <ParagraphStyled onClick={() => setSubcategorySelected(0)}>
                <LinkStyled to="/products">all</LinkStyled>
              </ParagraphStyled>
              {category.subcategories.map((subcategory) => (
                <ParagraphStyled
                  onClick={() => setSubcategorySelected(subcategory.id)}
                  key={subcategory.id}
                >
                  <LinkStyled to="/products">{subcategory.name}</LinkStyled>
                </ParagraphStyled>
              ))}
            </StyledSection>
          )}
        </>
      )}
    </>
  )
  function setSelectedCategories(categoryId, subcategoryID) {
    setCategorySelected(categoryId)
    setSubcategorySelected(subcategoryID)
  }

  function subcategoryVisible(categoryId) {
    setCategorySelected(categoryId)
    setIsSubcategoryVisible(!isSubcategoryVisible)
  }
}

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
`
const ParagraphStyled = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin-top: 8px;
`

const StyledSection = styled.section`
  p:last-of-type {
    margin-bottom: 16px;
  }
  p:first-of-type {
    margin-top: 4px;
  }
`
