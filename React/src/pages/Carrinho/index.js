import React, { Component } from "react";
import {connect} from "react-redux";
import {atualizarQuantidade, removerProdutoCarrinho} from"../../store/modules/carrinho/actions";

import {Container, Produtos, Item, AreaProduto, AreaQuantidade, AreaTotal, Total, CarrinhoVazio} from "./styles";
import {FaPlus, FaMinus, FaRegTrashAlt, FaShoppingCart} from "react-icons/fa";
import { formatarPreco } from "../../util/formatarPreco";

class Carrinho extends Component{
    constructor(props){
        super(props)
    }
    incrementar = (produto) =>{
        const {dispatch} = this.props;
        dispatch(atualizarQuantidade(produto._id, produto.quantidade + 1));
    }
    decrementar = (produto) =>{
        const {dispatch} = this.props;
        dispatch(atualizarQuantidade(produto._id, produto.quantidade - 1));
    }
    remover = (_id) =>{
        const {dispatch} = this.props;
        dispatch(removerProdutoCarrinho(_id));
    }
    render(){
        const {carrinho, total} = this.props;
        return (
            <Container>
                {
                    (carrinho.length > 0) ?
                    <Produtos>
                        {
                            carrinho.map(produto => (
                                <Item>
                                    <AreaProduto>
                                        <img src={`https://e-ncarte.com/img/produtos/${produto.imagem}`} alt={produto.descricao}/> 
                                        <div>
                                            <p>{produto.descricao}</p>
                                            <div>
                                                <p>{produto.precoFormatado}</p>
                                                <AreaQuantidade>
                                                    <button onClick={()=> this.decrementar(produto)}><FaMinus size="12px" color="var(--cor-padrao)"/></button>
                                                    <input type="text" value={produto.quantidade}/>
                                                    <button onClick={()=> this.incrementar(produto)}><FaPlus size="12px" color="var(--cor-padrao)"/></button>
                                                </AreaQuantidade>
                                            </div>                                
                                        </div> 
                                    </AreaProduto>                                  
                                    <AreaTotal>
                                        <p>{produto.subtotal}</p>
                                        <button onClick={() => this.remover(produto._id)}><FaRegTrashAlt size="16px"/></button>
                                    </AreaTotal>                  
                                </Item>
                            ))
                        }
                        <Total>Total: {total}</Total>
                    </Produtos>
                    :
                    <CarrinhoVazio>
                        <FaShoppingCart size="80px" />
                        Carrinho Vazio
                    </CarrinhoVazio>
                }
                
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        carrinho: state.carrinho.map(produto => {
            return {
                ...produto,
                subtotal: formatarPreco(produto.quantidade * produto.preco)
            }
        }),
        total: formatarPreco(state.carrinho.reduce((total, produto)=>{
            return total + produto.preco * produto.quantidade
        }, 0))
    }
}
export default connect(mapStateToProps)(Carrinho);