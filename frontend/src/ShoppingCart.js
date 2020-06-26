import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([])
  const [wasAmountUpated, setWasAmountUpdated] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8040/shoppingcart')
      .then((res) => res.json())
      .then((data) => setShoppingCart(data))
      .then(() => console.log('done'))
  }, [wasAmountUpated])

  function updateAmount(amountUpdate, cartId) {
    setWasAmountUpdated(false)
    const urlencoded = new URLSearchParams()
    urlencoded.append('amount', amountUpdate)
    urlencoded.append('cartId', cartId)

    const requestOptions = {
      method: 'PATCH',
      body: urlencoded,
      redirect: 'follow',
    }

    fetch('http://localhost:8040/shoppingcart', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => setWasAmountUpdated(true))
      .catch((error) => console.log('error', error))
  }

  return (
    <>
      <header>Shopping Cart</header>
      <MainStyled>
        {shoppingCart.map((cart) => (
          <SectionStyled key={cart._id}>
            <img src={cart.product.image} alt="" />
            <p>{cart.product.name}</p>
            <p>{cart.product.description}</p>
            <p>{cart.product.price} €</p>
            <ChangeAmountSection>
              <MinusIcon
                onClick={() => updateAmount(cart.amount - 1, cart._id)}
              />
              <p>{cart.amount}</p>
              <PlusIcon
                onClick={() => updateAmount(cart.amount + 1, cart._id)}
              />
            </ChangeAmountSection>
          </SectionStyled>
        ))}
      </MainStyled>
    </>
  )
}

const MainStyled = styled.main`
  padding: 12px;
`

const SectionStyled = styled.section`
  display: grid;
  grid-template-columns: 80px auto auto;
  grid-template-rows: 1fr 1fr 1fr;
  background: #dad7d5;
  border-radius: 8px;
  height: 80px;

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    border-radius: 8px;
    grid-column: 1 / 2;
    grid-row: 1/ 4;
  }
  p {
    grid-column: 2 / 3;
    margin-left: 4px;
    margin-top: 4px;
    font-weight: 200;
    font-size: 14px;
  }
`

const ChangeAmountSection = styled.section`
  display: flex;
  grid-row: 1 / 4;
  grid-column: 3 / 4;
  align-self: center;
  justify-self: center;
  p {
    margin: 0;
  }
`

const MinusIcon = styled(AiOutlineMinusCircle)`
  margin-right: 4px;
`
const PlusIcon = styled(AiOutlinePlusCircle)`
  margin-left: 4px;
`
