import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import ProductsList from './ProductsList'

export default function Products({ categorySelected }) {
  const [products, setProducts] = useState([])
  const [areDetailsVisible, setAreDetailsVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedSize, setSelectedSize] = useState()

  useEffect(() => {
    fetch('http://localhost:8040/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  function addToCart(productId, size) {
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
  }

  return (
    <>
      <header>Products</header>
      <main>
        {products.map((product) => (
          <CenteredContainer areDetailsVisible={areDetailsVisible}>
            <>
              {categorySelected === product.categoryId && (
                <ProductsList
                  product={product}
                  showDetails={showDetails}
                  addToCart={addToCart}
                  setSelectedSize={setSelectedSize}
                  selectedSize={selectedSize}
                />
              )}
              {categorySelected === '' && (
                <ProductsList
                  product={product}
                  showDetails={showDetails}
                  addToCart={addToCart}
                  setSelectedSize={setSelectedSize}
                  selectedSize={selectedSize}
                />
              )}
            </>
          </CenteredContainer>
        ))}
        {areDetailsVisible && (
          <DetailsSection>
            <CloseIcon onClick={() => setAreDetailsVisible(false)} />
            <p>{selectedProduct.name}</p>
            <p>brand: {selectedProduct.brand}</p>
            <p>color: {selectedProduct.color}</p>
            <p>{selectedProduct.details}</p>
            {selectedProduct.materials.map((material) => (
              <span>{material} </span>
            ))}
          </DetailsSection>
        )}
      </main>
    </>
  )
  function showDetails(id) {
    setSelectedProduct(products.find((item) => item._id === id))
    setAreDetailsVisible(true)
  }
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.areDetailsVisible ? 0.3 : 1)};
`

const DetailsSection = styled.section`
  position: absolute;
  top: 150px;
  left: 100px;
  background: #e9ebea;
  height: 200px;
  width: 200px;
`
const CloseIcon = styled(IoIosCloseCircleOutline)`
  position: absolute;
  left: 170px;
`
