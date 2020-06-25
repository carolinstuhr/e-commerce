import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Hoodiew from "./images/product_hoodiew.jpg";
import Hoodiem from "./images/product_hoodiem.jpg";
import Jeansbluew from "./images/product_jeansbluew.jpg";
import Jeansgreyw from "./images/product_jeansgreyw.jpg";
import Jeansbluem from "./images/product_jeansm.jpg";
import Tanktopm from "./images/product_tanktopm.jpg";
import Shirtm from "./images/product_shirtm.jpg";
import Shirtw from "./images/product_shirtw.jpg";

export default function Products({ categorySelected, inputAmount, amount }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8040/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  function addToCart(productId, amount) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("amount", amount);
    urlencoded.append("productId", productId);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:8040/shoppingcart/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <header>Products</header>
      <main>
        {products.map((product) => (
          <CenteredContainer key={product._id}>
            {categorySelected === product.categoryId && (
              <Card>
                {product._id === "5ef38036ccb2573134045318" && (
                  <img src={Jeansgreyw} alt="jeans grey female" />
                )}
                {product._id === "5ef38036ccb2573134045317" && (
                  <img src={Jeansbluew} alt="jeans blue female" />
                )}
                {product._id === "5ea05dbfb9130b381db647c9" && (
                  <img src={Jeansbluem} alt="jeans blue men" />
                )}
                {product._id === "5ea05e15b9130b381db647ca" && (
                  <img src={Tanktopm} alt="tanktop men" />
                )}
                {product._id === "5ea05e2bb9130b381db647cb" && (
                  <img src={Shirtw} alt="shirt female" />
                )}
                {product._id === "5ea05e38b9130b381db647cc" && (
                  <img src={Shirtm} alt="shirt male" />
                )}
                {product._id === "5ea05e54b9130b381db647cd" && (
                  <img src={Hoodiem} alt="hoodie male" />
                )}
                {product._id === "5ea05e70b9130b381db647ce" && (
                  <img src={Hoodiew} alt="hoodie female" />
                )}
                <h3>{product.name}</h3>
                <ul>
                  <li>{product.description}</li>
                  <li>{product.price} €</li>
                </ul>
                <form>
                  <label htmlFor="amount">Amount</label>
                  <input
                    onChange={(event) => changeAmount(event)}
                    id="amount"
                  />
                </form>
                <ButtonStyled onClick={() => addToCart(product._id, amount)}>
                  <LinkStyled to="/shoppingcart">Add to Cart</LinkStyled>
                </ButtonStyled>
              </Card>
            )}
            {categorySelected === "" && (
              <Card>
                {product._id === "5ea05d76b9130b381db647c7" && (
                  <img src={Jeansgreyw} alt="jeans grey female" />
                )}
                {product._id === "5ea05d99b9130b381db647c8" && (
                  <img src={Jeansbluew} alt="jeans blue female" />
                )}
                {product._id === "5ea05dbfb9130b381db647c9" && (
                  <img src={Jeansbluem} alt="jeans blue men" />
                )}
                {product._id === "5ea05e15b9130b381db647ca" && (
                  <img src={Tanktopm} alt="tanktop men" />
                )}
                {product._id === "5ea05e2bb9130b381db647cb" && (
                  <img src={Shirtw} alt="shirt female" />
                )}
                {product._id === "5ea05e38b9130b381db647cc" && (
                  <img src={Shirtm} alt="shirt male" />
                )}
                {product._id === "5ea05e54b9130b381db647cd" && (
                  <img src={Hoodiem} alt="hoodie male" />
                )}
                {product._id === "5ea05e70b9130b381db647ce" && (
                  <img src={Hoodiew} alt="hoodie female" />
                )}
                <h3>{product.name}</h3>
                <ul>
                  <li>{product.description}</li>
                  <li>{product.price} €</li>
                </ul>
                <form>
                  <label htmlFor="amount">Amount: </label>
                  <input
                    onChange={(event) => changeAmount(event)}
                    id="amount"
                  />
                </form>
                <ButtonStyled onClick={() => addToCart(product._id, amount)}>
                  <LinkStyled to="/shoppingcart">Add to Cart</LinkStyled>
                </ButtonStyled>
              </Card>
            )}
          </CenteredContainer>
        ))}
      </main>
    </>
  );
  function changeAmount(event) {
    inputAmount(event.target.value);
  }
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  height: 325px;
  width: 250px;
  border-radius: 25px;
  margin-top: 1em;
  box-shadow: 2px 2px 2px lightgrey, -2px 0 2px lightgrey;

  img {
    height: 55%;
    width: 100%;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }

  h3 {
    text-align: center;
    margin-top: 0.4em;
  }
  li {
    list-style: none;
    margin-top: 0.25em;
  }
  input {
    width: 30px;
  }
`;

const ButtonStyled = styled.button`
  background: #4e5c5b;
  color: white;
  border: none;
  padding: 0.75em;
  width: 125px;
  margin-top: 1em;
  border-radius: 10px;
  font-size: 0.75em;
  font-weight: bold;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
`;
