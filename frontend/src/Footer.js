import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Home from './images/home.png'
import Products from './images/shirt.png'
import Shoppingcart from './images/shopping-cart.png'

export default function Footer({ setCategorySelected, shoppingCart }) {
  return (
    <FooterStyled>
      <LinkStyled exact to="/" activeClassName="selected">
        <img src={Home} alt="home Button" />
      </LinkStyled>
      <LinkStyled to="/products" activeClassName="selected" onClick={showAll}>
        <img src={Products} alt="product Button" />
      </LinkStyled>
      <LinkStyled to="/shoppingcart" activeClassName="selected">
        <p>{shoppingCart.length}</p>
        <img src={Shoppingcart} alt="shoppingcard Button" />
      </LinkStyled>
    </FooterStyled>
  )
  function showAll() {
    setCategorySelected('')
  }
}
const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background: #ecebea;
`
const LinkStyled = styled(NavLink)`
  padding: 10px;
  &.selected {
    background: #a39c95;
    border-radius: 8px;
  }
  img {
    height: 25px;
  }
  p {
    position: absolute;
    padding-left: 7px;
    right: 50px;
    bottom: 30px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    color: white;
    border: 1px solid #bd0606;
    background: #bd0606;
  }
`
