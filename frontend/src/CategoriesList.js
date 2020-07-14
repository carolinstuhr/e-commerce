import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { CSSTransition } from 'react-transition-group'

export default function CategoriesList({
  category,
  setCategorySelected,
  setSubcategorySelected,
  categorySelected,
  isSubcategoryVisible,
  setIsSubcategoryVisible,
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
          <ButtonStyled onClick={() => subcategoryVisible(category.id)}>
            {category.name}
          </ButtonStyled>
          <CSSTransition
            in={categorySelected === category.id}
            classNames="fade"
            timeout={500}
            unmountOnExit
          >
            <StyledSection>
              {isSubcategoryVisible && (
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
    if (categoryId === categorySelected) {
      setIsSubcategoryVisible(false)
      setCategorySelected('')
    } else if (categoryId !== categorySelected && isSubcategoryVisible) {
      setCategorySelected('')
      setIsSubcategoryVisible(false)
      setTimeout(() => {
        setIsSubcategoryVisible(true)
        setCategorySelected(categoryId)
      }, 750)
    } else {
      setIsSubcategoryVisible(true)
      setCategorySelected(categoryId)
    }
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
    max-height: 0;
  }

  &.fade-enter-active {
    max-height: 150px;
    transition: max-height 500ms;
  }

  &.fade-exit {
    min-height: 50px;
  }

  &.fade-exit-active {
    min-height: 0;
    transition: min-height 500ms;
  }
`
