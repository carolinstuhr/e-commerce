import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Barlow', sans-serif;
}

#root {
    display: grid;
    grid-template-rows: 50px auto 50px;
    height: 100vh;
}

main {
    padding-left: 4px;
    overflow: scroll;
}

header {
    display: flex; 
    justify-content: center; 
    align-items: center;
    background: #ecebea;
    color: #7e746b;
    font-size: 22px;
    font-weight: 600;
}
`
