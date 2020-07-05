import styled from "styled-components";

export const Container = styled.div`
    background: #fff;
`;

export const AreaProduto = styled.div`
    padding: 10px 0;
`;
export const Imagem = styled.div`
    margin: 0 auto;
    width: 80%;
    height: 200px;
    border-bottom: 1px solid;
    border-color: #c3c3c3;
    display: flex;
    align-items: center;
    img {
        padding: 10px;
        display: block;
        margin: 0 auto;
        height: 100px;
    }
`;
export const Descricao = styled.h3`
    margin-left: 10px;
    margin-top: 5px;
    font-size: 0.8em;
    font-weight: 400;
`;
export const Preco = styled.p`
    margin-left: 10px;
    padding: 1px;
    color: #ff0000;    
    font-weight: bold;
    font-style: italic;
    background: yellow;
    font-size: 0.7em;
    border-radius: 2px;
    display: inline;
`;
export const BotaoCarrinho = styled.button`
    border-radius: 10px;
    padding: 5px;
    border: 1px solid;
    display: block;
    margin: 5px auto 0 auto;
    color: #fff;
    background: var(--cor-padrao);
    &:hover {
        color: var(--cor-padrao);
        background: #fff;
    }
`;
