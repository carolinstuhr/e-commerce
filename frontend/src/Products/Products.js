import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import ProductsList from './ProductsList'
import { Link } from 'react-router-dom'
import { BsCheck } from 'react-icons/bs'

export default function Products({
  categorySelected,
  isRedirectOptionVisible,
  setIsRedirectOptionVisible,
  subcategorySelected,
}) {
  const [products, setProducts] = useState([])
  const [areDetailsVisible, setAreDetailsVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()

  useEffect(() => {
    fetch('http://localhost:8040/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <>
      <header>Products</header>
      <main>
        {products.map((product, index) => (
          <CenteredContainer
            areDetailsVisible={areDetailsVisible}
            isRedirectOptionVisible={isRedirectOptionVisible}
            key={index}
          >
            <>
              {subcategorySelected === 0
                ? categorySelected === product.categoryId && (
                    <ProductsList
                      product={product}
                      showDetails={showDetails}
                      setIsRedirectOptionVisible={setIsRedirectOptionVisible}
                    />
                  )
                : categorySelected === product.categoryId &&
                  subcategorySelected === product.subcategoryId && (
                    <ProductsList
                      product={product}
                      showDetails={showDetails}
                      setIsRedirectOptionVisible={setIsRedirectOptionVisible}
                    />
                  )}
              {categorySelected === '' && subcategorySelected === '' && (
                <ProductsList
                  product={product}
                  showDetails={showDetails}
                  setIsRedirectOptionVisible={setIsRedirectOptionVisible}
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
            <InnerSectionStyled>
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
            </InnerSectionStyled>
          </DetailsSection>
        )}
        {isRedirectOptionVisible && (
          <RedirectSection>
            <p>Item added to your cart.</p>
            <div>
              <CheckIcon />
            </div>
            <div>
              <LinkStyled to="/shoppingcart">
                <ButtonStyled onClick={() => setIsRedirectOptionVisible(false)}>
                  See Cart
                </ButtonStyled>
              </LinkStyled>
              <ButtonStyled onClick={() => setIsRedirectOptionVisible(false)}>
                Keep Browsing
              </ButtonStyled>
            </div>
          </RedirectSection>
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
  opacity: ${(props) =>
    props.areDetailsVisible || props.isRedirectOptionVisible ? 0.2 : 1};
`

const SectionStyled = styled.section`
  position: absolute;
  left: 50px;
  background: #f8f6f4;
  width: 280px;
  padding-left: 12px;
  padding-bottom: 12px;
  border-radius: 8px;
`

const DetailsSection = styled(SectionStyled)`
  top: 150px;
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
const InnerSectionStyled = styled.section`
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
const RedirectSection = styled(SectionStyled)`
  padding: 12px;
  top: 200px;
  p,
  div {
    text-align: center;
  }
`

const CheckIcon = styled(BsCheck)`
  height: 25px;
  width: 25px;
  padding: 2px;
  margin-top: 12px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid black;
`

const ButtonStyled = styled.button`
  background: #adacab;
  color: white;
  border: none;
  padding: 8px;
  width: 100px;
  margin-top: 12px;
  font-size: 12px;
  margin-right: 8px;
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
`
