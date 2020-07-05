import styled from "styled-components";
import {sm, lg} from "../../styles/mediaQueries";


export const LoadIcon = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    

    svg {       
        @keyframes girar {
             from {transform: rotate(0);} 
             to {transform: rotate(360deg); }
        }
        animation: girar 2s linear infinite; 
        color: #c9c9c9;        
    }
`;
export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    > div {
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
        margin: 10px auto;
        border-radius: 10px;
        background: #fff;
    }
    @media (${lg}){
        flex-wrap: nowrap;
    } 
`;

export const AreaPrincipal = styled.div`
    order: 1;
    padding: 5px;
    max-width: 900px;
    min-height: 240px;   
    @media (${lg}){
        order: 2;
    } 
`;
export const InputBuscar = styled.input`
    display: block;
    width: 100%;
    border-bottom: 1px solid;
    border-color: #c3c3c3;
    margin: 5px auto;
    text-align: center;
    font-size: 1em;
    font-weight: 400;
    padding: 2px;
    color: var(--cor-padrao);
    @media (${sm}){
        width: 300px;
    }
`;
export const AreaFiliados = styled.div`
    order: 2;
    width: 100%;
    @media (${lg}){
        width: 230px;
        order: 1
    } 
`;
export const Filiados = styled.ul`
    list-style: none;    
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background: #fff;
    align-items: center;
    justify-content: center;
    @media (${sm}){
        flex-direction: row;
        justify-content: space-around;
    }
    li{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        margin-top: 10px;
        border-bottom: 1px solid;
        border-color: #c3c3c3;
        padding-bottom: 5px;    
        height: 120px;    
        @media (${sm}){
            max-width: 250px;
        }
        img{
            width: 64px;
        }
        p {
            padding: 10px;
            font-size: 0.7em;
        }
        h4 {
            font-size: 0.7em;
        }
        a{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 5px;
            margin: 5px;
            font-size: 0.7em;
            svg {
                margin-left: 5px;
                padding: 1px;
                border-radius: 15px;
                background: #25d366;
                color: #fff;
            }
        }
        
    }
`;
export const LojaLogo = styled.img`
    display: block;
    width: 130px;
    margin: 0 auto;
`;
export const Titulo = styled.h3`
    color: var(--cor-padrao);
    font-size: 0.9em;
    margin: 0 auto;
    text-align: center;
`;
export const Parceiros = styled.ul`
    padding: 3px;  
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    list-style: none;
`;
export const Parceiro = styled.li`
    margin: 10px;
    img {
        border-radius: 10px;
        max-height: 45px;
    }
`;
export const ImagemCampanha = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
    min-width: 200px;
    margin: 0 3px;
`;

export const Produtos = styled.ul` 
    margin-top: 5px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
export const Produto = styled.li`
    width: 100%;
    min-height: 64px;
    display: flex;
    justify-content: space-between;   
    align-items: center;         
    padding: 5px;
    margin: 5px 5px;
    border-radius: 3px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    @media(${sm}){
        max-width: 45%;
    }
    @media(${lg}){
        max-width: 30%;
    }
    &:hover{
        cursor: pointer;
    }
    img {
        height: 45px;
    }
    > div {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        justify-content: space-around;
        margin-right: 10px;
        height: 100%;
        >p {
            text-align: right;
            font-size: 0.8em;
        }
        div {
            display: flex;
            align-items: center;
            margin-right: 5px;
            p {
                margin-right: 5px;
                padding: 1px;
                font-size: 0.9em;
                font-weight: bold;
                font-style: italic;
                color: #ff0000;
                background: yellow;
                border-radius: 2px;
            }
            button {
                width: 10px;
                background: #fff;
                color: var(--cor-padrao);

            }
        }               
    }         
`;
export const Stickys = styled.div`
    border: 1px solid red;
    display: flex;
    justify-content: flex-end;
    position: sticky;
    bottom: 5px;

`;

export const ToastPromocao = styled.div`
    background: #fff;
    border-radius: 4px;
    bottom: 5px;
`;

export const CompreAgoraPrincipal = styled.a`
    text-align: center;
    font-size: 0.7em;
    width: 80px;
    background-color: rgba(224, 224, 224, 0.397);
    border-radius: 4px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: rgb(224, 224, 224);
    }
    img {
        margin: 0 auto;
        width: 52px;
    }
`;

