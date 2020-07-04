import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { CSSTransition } from 'react-transition-group'

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
          <CSSTransition
            in={isSubcategoryVisible}
            classNames="fade"
            timeout={200}
            unmountOnExit
          >
            <StyledSection>
              {categorySelected === category.id && (
                <>
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
                </>
              )}
            </StyledSection>
          </CSSTransition>
        </>
      )}
    </>
  )
  function setSelectedCategories(categoryId, subcategoryID) {
    setCategorySelected(categoryId)
    setSubcategorySelected(subcategoryID)
  }

  function subcategoryVisible(categoryId) {
    // if (categoryId === categorySelected) {
    //   setIsSubcategoryVisible(!isSubcategoryVisible)
    //   setCategorySelected('')
    // } else {
    setIsSubcategoryVisible(!isSubcategoryVisible)
    setCategorySelected(categoryId)

    // setCategorySelected(categoryId)

    // if (isSubcategoryVisible.includes(categoryId)) {
    //   const index = isSubcategoryVisible.indexOf(categoryId)
    //   console.log(index)
    //   console.log(isSubcategoryVisible)
    //   setIsSubcategoryVisible([
    //     ...isSubcategoryVisible.slice(0, index),
    //     ...isSubcategoryVisible.slice(index + 1),
    //   ])
    //   console.log(index)
    // } else {
    //   setIsSubcategoryVisible([...isSubcategoryVisible, categoryId])
    //   console.log(isSubcategoryVisible)
    // }
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
  z-index: 4;
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

  &.fade-enter {
    height: 0;
  }

  &.fade-enter-active {
    height: 100px;
    transition: height 200ms;
  }

  &.fade-exit {
    height: 100px;
  }

  &.fade-exit-active {
    height: 0;
    transition: height 200ms;
  }
`
