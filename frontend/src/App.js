import React, { useState } from 'react'
import GlobalStyles from './GlobalStyles'
import Home from './Home'
import Footer from './Footer'
import Products from './Products/Products'
import { Route, Switch } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'

export default function App() {
  const [categorySelected, setCategorySelected] = useState('')

  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Home clickCategory={setCategory} />
        </Route>
        <Route path="/products">
          <Products categorySelected={categorySelected} />
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart />
        </Route>
      </Switch>
      <Footer setCategorySelected={setCategorySelected} />
    </>
  )

  function setCategory(categoryId) {
    setCategorySelected(categoryId)
  }
}
