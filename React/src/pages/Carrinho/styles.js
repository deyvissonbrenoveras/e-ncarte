import styled from "styled-components";

export const Container = styled.div`
    margin: 30px auto;
    max-width: 900px;
    min-height: 130px;
    background: #fff;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 10px;
`;
export const Produtos = styled.ul`
    list-style: none;
`;
export const Item = styled.li`
    margin-top: 10px;
    padding: 5px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

`;
export const AreaProduto = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 3px;
    img{
        width: 30px;
    }
    > div {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        /* align-items: flex-end; */
        justify-content: space-between;
        /* text-align: right; */
        p:first-child {
            font-size: 0.6em;
        }
        > div {
            display: flex;
            flex-direction: row;
            margin-top: 5px;
            p:first-child {
                padding: 3px;
                font-size: 0.7em;
                font-weight: bold;
                font-style: italic;
                color: #ff0000;
                background: yellow;
                border-radius: 4px;
            }
        }
        
    }
`;
export const AreaQuantidade = styled.div`
    display: flex;
    align-items: center;
    margin: 0 5px;
    input {
        width: 24px;
        height: 15px;
        font-size: 0.7em;
        text-align: center;
    }
    button {
        background: #fff;
        svg {
            width: 12px;
        }
    }
`;
export const AreaTotal = styled.div`
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    font-size: 0.6em;
    padding: 3px;
    p {
        text-align: center;
        color: var(--cor-padrao);
        font-weight: bold;
    }
    button {
        background: #fff;
        svg {
           height: 8px;
        }
    }
`;
export const Total = styled.h3`
    margin-top: 20px;
    text-align: right;
    font-size: 1em;
`;
export const CarrinhoVazio = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #d9d9d9;
    svg {
        color: #d9d9d9;
    }
`;