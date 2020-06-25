import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
}

#root {
    display: grid;
    grid-template-rows: 50px auto 50px;
    height: 100vh;
}

main {
    padding: .75em;
    overflow: scroll;
}

header {
    display: flex; 
    justify-content: center; 
    align-items: center;
    background: #fff;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
}

footer {
    display: flex; 
    justify-content: center; 
    align-items: center;
    background: hotpink;
    color: white;
}
`;
