import styled from "styled-components";
import {sm} from "../../styles/mediaQueries";
export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    /* width: 100%; */
    /* border: 1px solid red; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    min-height: 30px;
    @media (${sm}){
        justify-content: space-between;
    }

    img{
        width: 64px;
    }

`;
export const Menu = styled.ul`
    display: flex;
    list-style: none; 
    align-items: center;
    padding: 0 5px;
    margin-top: 5px;
    li {
        display: flex;
        align-items: center;
        margin: 0 10px;
    }
    a {     
        font-size: 0.7em;   
        color: var(--cor-padrao);
        text-decoration: none;
        font-weight: 550;
    }
`;