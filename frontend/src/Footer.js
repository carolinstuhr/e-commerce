import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { RiHome2Line } from 'react-icons/ri'
import { RiShirtLine } from 'react-icons/ri'
import { RiShoppingCartLine } from 'react-icons/ri'

export default function Footer({
  setCategorySelected,
  shoppingCart,
  setSubcategorySelected,
}) {
  return (
    <FooterStyled>
      <LinkStyled exact to="/" activeClassName="selected">
        <HomeIcon />
      </LinkStyled>
      <LinkStyled to="/products" activeClassName="selected" onClick={showAll}>
        <ProductsIcon />
      </LinkStyled>
      <LinkStyled to="/shoppingcart" activeClassName="selected">
        {shoppingCart.length > 0 && <p>{shoppingCart.length}</p>}
        <CartIcon />
      </LinkStyled>
    </FooterStyled>
  )
  function showAll() {
    setCategorySelected('')
    setSubcategorySelected('')
  }
}
const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background: var(--quarternary);
`
const LinkStyled = styled(NavLink)`
  padding: 10px;
  &.selected {
    background: #d7cec7;
    border-radius: 8px;
  }
  p {
    position: absolute;
    padding-left: 7px;
    right: 50px;
    bottom: 30px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    color: var(--primary);
    border: 1px solid #76323f;
    background: #76323f;
  }
`

const HomeIcon = styled(RiHome2Line)`
  height: 25px;
  width: 25px;
`
const ProductsIcon = styled(RiShirtLine)`
  height: 25px;
  width: 25px;
`

const CartIcon = styled(RiShoppingCartLine)`
  height: 25px;
  width: 25px;
`
