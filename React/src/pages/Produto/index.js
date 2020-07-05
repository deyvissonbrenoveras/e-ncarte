import React from "react"
import { Component } from "react";
import {connect} from "react-redux";
import {FaCartPlus} from "react-icons/fa";
import {Container, AreaProduto, Descricao, Imagem, Preco, BotaoCarrinho} from "./styles";
import { addProdutoCarrinho } from "../../store/modules/carrinho/actions";

class Produto extends Component{   
    handleAddProduto = (produto) =>{
        const {dispatch} = this.props;
        dispatch(addProdutoCarrinho(produto));
    } 
    render(){
        const {loja, match} = this.props;
        const produto = loja.produtos.filter(prod => prod._id === match.params.id)[0];

        return(
            <Container>
               <AreaProduto>
                    <Imagem>
                        <img src={`https://e-ncarte.com/img/produtos/${produto.imagem}`}/>
                    </Imagem>
                    <Descricao>{produto.descricao}</Descricao>
                    <Preco>{produto.precoFormatado}</Preco>
                    <BotaoCarrinho onClick={()=> this.handleAddProduto(produto)}>ADICIONAR AO CARRINHO <FaCartPlus/></BotaoCarrinho>
               </AreaProduto>
            </Container>
        );
    }
}
function mapStateToProps(state){
    return {
        loja: state.loja
    }
}
export default connect(mapStateToProps)(Produto);