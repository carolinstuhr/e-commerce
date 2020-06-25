import React, { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Footer from "./Footer";
import Products from "./Products";
import { Route, Switch } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";

export default function App() {
  const [categorySelected, setCategorySelected] = useState("");
  const [amount, setAmount] = useState("1");

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
            inputAmount={updateAmount}
            amount={amount}
          />
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart />
        </Route>
      </Switch>
      <Footer setCategorySelected={setCategorySelected} />
    </>
  );
  function updateAmount(amount) {
    setAmount(amount);
  }

  function setCategory(categoryId) {
    setCategorySelected(categoryId);
  }
}
