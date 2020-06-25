import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hoodiem from "./images/hoodiem.jpg";
import Hoodiew from "./images/hoodiew.jpg";
import Jeansm from "./images/jeansm.jpg";
import Jeansw from "./images/jeansw.jpg";
import Shirtm from "./images/shirtm.jpg";
import Shirtw from "./images/shirtw.jpg";
import styled from "styled-components";

export default function Home({ clickCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8040/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <>
      <header>Home</header>
      <main>
        <CenteredContainer>
          {categories.map((category) => (
            <Card key={category._id}>
              {category.id === 1 && <img src={Hoodiew} alt="hoodie female" />}
              {category.id === 2 && <img src={Hoodiem} alt="hoodie male" />}
              {category.id === 3 && <img src={Shirtw} alt="shirts female" />}
              {category.id === 4 && <img src={Shirtm} alt="shirts male" />}
              {category.id === 5 && <img src={Jeansw} alt="jeans female" />}
              {category.id === 6 && <img src={Jeansm} alt="jeans male" />}
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <ButtonStyled onClick={() => clickCategory(category.id)}>
                <LinkStyled to="/products">See Products</LinkStyled>
              </ButtonStyled>
            </Card>
          ))}
        </CenteredContainer>
      </main>
    </>
  );
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
  height: 300px;
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

  h2,
  p {
    text-align: center;
    margin-top: 0.25em;
  }
`;

const ButtonStyled = styled.button`
  background: #6b6056;
  color: white;
  border: none;
  padding: 1em;
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
