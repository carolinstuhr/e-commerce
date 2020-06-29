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
            <ParagraphStyled>Size: {cart.size.toUpperCase()}</ParagraphStyled>
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
            <AmountParagraphStyled>
              {cart.product.price * cart.amount} €
            </AmountParagraphStyled>
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
  grid-template-columns: 120px auto auto 70px;
  grid-template-rows: auto 1fr 1fr;
  color: #7e746b;
  box-shadow: 2px 2px 2px #908880, -2px 0 2px #908880;
  height: 120px;
  margin-bottom: 16px;

  img {
    height: 120px;
    width: 120px;
    object-fit: cover;
    grid-column: 1 / 2;
    grid-row: 1/ 4;
  }
  h4 {
    grid-column: 2 / 4;
    margin-left: 16px;
    margin-top: 4px;
    font-weight: 600;
    font-size: 16px;
  }
`
const ParagraphStyled = styled.p`
  grid-column: 2 / 3;
  margin-left: 16px;
  font-weight: 200;
  font-size: 14px;
  align-self: center;
`

const ChangeAmountSection = styled.section`
  display: flex;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  align-self: center;
  margin-left: 16px;
  border: 1px solid #908880;
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

const AmountParagraphStyled = styled.p`
  grid-column: 4 / 5;
  grid-row: 3 / 4;
  justify-self: end;
  margin-right: 4px;
  align-self: center;
  font-weight: 200;
`

const TotalPriceParagraph = styled.p`
  border-top: 2px double #908880;
  color: #7e746b;
  text-align: right;
  margin-top: 16px;
  padding-top: 4px;
  margin-bottom: 18px;
`
