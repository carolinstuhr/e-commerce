import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function CategoriesList({
  category,
  setCategorySelected,
  setSubcategorySelected,
  categorySelected,
}) {
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
          <ButtonStyled onClick={() => setCategorySelected(category.id)}>
            {category.name}
          </ButtonStyled>
          {categorySelected === category.id && (
            <>
              <LinkStyled to="/products">
                <p onClick={() => setSubcategorySelected(0)}>all</p>
              </LinkStyled>
              {category.subcategories.map((subcategory) => (
                <LinkStyled to="/products">
                  <p onClick={() => setSubcategorySelected(subcategory.id)}>
                    {subcategory.name}
                  </p>
                </LinkStyled>
              ))}
            </>
          )}
        </>
      )}
    </>
  )
  function setSelectedCategories(categoryId, subcategoryID) {
    setCategorySelected(categoryId)
    setSubcategorySelected(subcategoryID)
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
  color: #ecebea;
`
