import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    font-family: 'Barlow', sans-serif;
    color: var(--secondary);
}

#root {
    display: grid;
    grid-template-rows: 50px auto 50px;
    height: 100vh;
    --primary: #faf9f8;
    --secondary: #565656;
    --tertiary: #a19b95;
    --quarternary: #f0edea;
}

main {
    padding-left: 4px;
    overflow: scroll;
    background: var(--primary);
}

header {
    display: flex; 
    justify-content: center; 
    align-items: center;
    background: var(--quarternary);
    font-size: 24px;
    font-weight: 600;
    font-family: 'Inconsolata', monospace;
}

`
