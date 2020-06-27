import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export default function ProductsList({ product, showDetails }) {
  const [selectedSize, setSelectedSize] = useState({})

  return (
    <Card>
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
      <p onClick={() => showDetails(product._id)}>See Details</p>
      <FormStyled>
        <SizeSelection
          id="size"
          onChange={(event) =>
            setSelectedSize({ product: product._id, size: event.target.value })
          }
        >
          {console.log(selectedSize)}
          <option>Select Size...</option>
          {product.size.map((size) => (
            <option value={size}>{size}</option>
          ))}
        </SizeSelection>
      </FormStyled>
      <LinkStyled to="/shoppingcart">
        <ButtonStyled
          onClick={() =>
            addToCart(product._id, selectedSize.product, selectedSize.size)
          }
        >
          Add to Cart
        </ButtonStyled>
      </LinkStyled>
    </Card>
  )

  function addToCart(productId, productSize, size) {
    if (productSize === productId) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

      const urlencoded = new URLSearchParams()
      urlencoded.append('amount', 1)
      urlencoded.append('size', size)
      urlencoded.append('productId', productId)

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
      }

      fetch('http://localhost:8040/shoppingcart/', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
    } else {
      alert('Please select a size')
    }
  }
}

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 390px;
  width: 250px;
  border-radius: 25px;
  margin-top: 12px;
  box-shadow: 2px 2px 2px lightgrey, -2px 0 2px lightgrey;

  img {
    height: 54%;
    width: 100%;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }

  h3 {
    text-align: center;
    margin-top: 4px;
    font-weight: 400;
  }
  p {
    margin-top: 8px;
    font-weight: 200;
    font-size: 14px;
  }
`
const FormStyled = styled.form`
  font-weight: 200;
  font-size: 14px;
`

const SizeSelection = styled.select`
  width: 125px;
  height: 28px;
  margin-top: 16px;
  border-radius: 8px;
  border: 1px solid #6b6056;
  padding-bottom: 2px;
  background: #dad7d5;
`

const ButtonStyled = styled.button`
  background: #6b6056;
  color: white;
  border: none;
  padding: 12px;
  width: 125px;
  margin-top: 12px;
  border-radius: 10px;
  font-size: 0.75em;
  font-weight: bold;
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
`
