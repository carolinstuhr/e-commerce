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
            <HeadlineStyled>{selectedProduct.name}</HeadlineStyled>
            <DescriptionStyled>{selectedProduct.description}</DescriptionStyled>
            <SectionStyled>
              <span>brand:</span>
              <span>{selectedProduct.brand}</span>
              <span>color:</span>
              <span>{selectedProduct.color}</span>
              <span>materials:</span>
              <ul>
                {selectedProduct.materials.map((material) => (
                  <li>{material} </li>
                ))}
              </ul>
            </SectionStyled>
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
  left: 50px;
  background: #ecebea;
  width: 280px;
  padding-left: 12px;
  padding-bottom: 12px;
  border-radius: 8px;
`
const CloseIcon = styled(IoIosCloseCircleOutline)`
  position: absolute;
  left: 250px;
  height: 28px;
  width: 28px;
`

const HeadlineStyled = styled.h4`
  margin-top: 8px;
  text-align: center;
`

const DescriptionStyled = styled.p`
  margin-top: 8px;
  font-weight: 200;
  font-size: 14px;
  font-style: italic;
  text-align: center;
  margin-bottom: 18px;
`
const SectionStyled = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;

  span {
    margin-top: 8px;
    font-weight: 200;
    font-size: 14px;
    margin-right: 16px;
  }
  ul {
    font-weight: 200;
    font-size: 14px;
    margin-top: 8px;
    list-style: none;
  }
  li {
    margin-bottom: 4px;
  }
`
