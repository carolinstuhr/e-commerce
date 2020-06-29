import React, { useState, useEffect } from 'react'
import GlobalStyles from './GlobalStyles'
import Home from './Home'
import Footer from './Footer'
import Products from './Products/Products'
import { Route, Switch } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'

export default function App() {
  const [categorySelected, setCategorySelected] = useState('')
  const [shoppingCart, setShoppingCart] = useState([])
  const [wasAmountUpated, setWasAmountUpdated] = useState(false)
  const [isRedirectOptionVisible, setIsRedirectOptionVisible] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8040/shoppingcart')
      .then((res) => res.json())
      .then((data) => setShoppingCart(data))
      .then(() => console.log('done'))
  }, [wasAmountUpated, isRedirectOptionVisible])

  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Home clickCategory={setCategory} />
        </Route>
        <Route path="/products">
          <Products
            categorySelected={categorySelected}
            isRedirectOptionVisible={isRedirectOptionVisible}
            setIsRedirectOptionVisible={setIsRedirectOptionVisible}
          />
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart
            shoppingCart={shoppingCart}
            setWasAmountUpdated={setWasAmountUpdated}
          />
        </Route>
      </Switch>
      <Footer
        setCategorySelected={setCategorySelected}
        shoppingCart={shoppingCart}
      />
    </>
  )

  function setCategory(categoryId) {
    setCategorySelected(categoryId)
  }
}
