import {createGlobalStyle} from "styled-components";
export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
    }
    html, body {
        height: 100%;
    }
    body{
        --cor-padrao: rgb(237, 47, 87);
        background: #f7f7f7;
        font-family: Arial, Helvetica, sans-serif;
    }
    input, button {
        border: none;
        outline: 0;
    }
    button:hover{
        cursor: pointer;
    }
    a {
        color: #000000;
        text-decoration: none;
    }
`;