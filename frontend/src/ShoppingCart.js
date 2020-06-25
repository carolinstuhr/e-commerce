import React, { useEffect, useState } from "react";

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8040/shoppingcart")
      .then((res) => res.json())
      .then((data) => setShoppingCart(data));
  }, []);

  function updateAmount(amountUpdate, cartId) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("amount", amountUpdate);
    urlencoded.append("cartId", cartId);

    const requestOptions = {
      method: "PATCH",
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:8040/shoppingcart", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <header>Shopping Cart</header>
      <main>
        {shoppingCart.map((cart) => (
          <ul key={cart._id}>
            <li>
              {cart.product && cart.product.name}
              <input
                placeholder={cart.amount}
                onChange={(event) => handleAmountUpdate(event, cart)}
                value={cart.amount}
                name="amountField"
              />
              <button onClick={() => updateAmount(cart.amount, cart._id)}>
                update amount
              </button>
            </li>
          </ul>
        ))}
      </main>
      {console.log(shoppingCart)}
    </>
  );

  function handleAmountUpdate(event, cart) {
    let newAmount = event.target.value;
    let index = shoppingCart.indexOf(cart);
    console.log(index);
    console.log(cart);
    setShoppingCart([
      ...shoppingCart.slice(0, index),
      { ...cart, amount: newAmount },
      ...shoppingCart.slice(index + 1),
    ]);
  }
}
