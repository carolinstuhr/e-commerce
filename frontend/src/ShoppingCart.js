import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'

export default function ShoppingCart({ shoppingCart, setWasAmountUpdated }) {
  return (
    <>
      <header>Shopping Cart</header>
      <MainStyled>
        {shoppingCart.map((cart) => (
          <SectionStyled key={cart._id}>
            <img src={cart.product.image} alt="" />
            <h4>{cart.product.name}</h4>
            <p>size: {cart.size}</p>
            <ChangeAmountSection>
              <MinusIcon
                onClick={() => updateAmount(cart.amount - 1, cart._id)}
              />
              <p>{cart.amount}</p>
              <PlusIcon
                onClick={() => updateAmount(cart.amount + 1, cart._id)}
              />
            </ChangeAmountSection>
            <DeleteIcon onClick={() => deleteItem(cart._id)} />
            <TotalAmountSection>
              <p>{cart.product.price * cart.amount} €</p>
            </TotalAmountSection>
          </SectionStyled>
        ))}
        <TotalPriceParagraph>
          Total:{' '}
          {shoppingCart.reduce(
            (acc, curr) => acc + curr.product.price * curr.amount,
            0
          )}{' '}
          €
        </TotalPriceParagraph>
      </MainStyled>
    </>
  )

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

  function deleteItem(cartId) {
    setWasAmountUpdated(false)
    const urlencoded = new URLSearchParams()
    urlencoded.append('cartId', cartId)

    var requestOptions = {
      method: 'DELETE',
      body: urlencoded,
      redirect: 'follow',
    }

    fetch('http://localhost:8040/shoppingcart', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => setWasAmountUpdated(true))
      .catch((error) => console.log('error', error))
  }
}

const MainStyled = styled.main`
  padding: 12px;
`

const SectionStyled = styled.section`
  display: grid;
  grid-template-columns: 90px auto auto 70px;
  grid-template-rows: 1fr 1fr;
  color: #7e746b;
  box-shadow: 2px 2px 2px #908880, -2px 0 2px #908880;
  border-radius: 8px;
  height: 90px;
  margin-bottom: 12px;

  img {
    height: 90px;
    width: 90px;
    object-fit: cover;
    border-radius: 8px;
    grid-column: 1 / 2;
    grid-row: 1/ 3;
  }
  h4 {
    grid-column: 2 / 4;
    margin-left: 8px;
    margin-top: 4px;
    font-weight: 400;
    font-size: 16px;
  }
  p {
    grid-column: 2 / 3;
    margin-left: 8px;
    font-weight: 200;
    font-size: 14px;
    align-self: center;
  }
`

const ChangeAmountSection = styled.section`
  display: flex;
  grid-row: 2 / 3;
  grid-column: 3 / 4;
  align-self: center;
  margin-left: 8px;
  border: 1px solid #908880;
  border-radius: 4px;
  width: 52px;
  padding: 2px 4px;

  p {
    margin: 0;
  }
`

const MinusIcon = styled(AiOutlineMinus)`
  margin-top: 2px;
  margin-right: 4px;
  width: 14px;
`
const PlusIcon = styled(AiOutlinePlus)`
  margin-top: 2px;
  margin-left: 4px;
  width: 14px;
`
const DeleteIcon = styled(AiOutlineDelete)`
  grid-column: 4 / 5;
  grid-row: 1 / 2;
  justify-self: end;
  height: 20px;
  width: 20px;
  margin-right: 4px;
  margin-top: 4px;
`

const TotalAmountSection = styled.section`
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  justify-self: end;
  margin-right: 4px;
  align-self: center;
`

const TotalPriceParagraph = styled.p`
  border-top: 2px double #908880;
  color: #7e746b;
  text-align: right;
  margin-top: 16px;
  padding-top: 4px;
`
