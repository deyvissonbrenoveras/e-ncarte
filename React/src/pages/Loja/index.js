import React, {Component} from "react";
import api from "../../services/api";
import {connect} from "react-redux";
import { formatarPreco } from "../../util/formatarPreco";

import {addProdutoCarrinho} from"../../store/modules/carrinho/actions";
import {addLoja} from "../../store/modules/loja/actions";

import {FaCartPlus, FaWhatsapp} from "react-icons/fa";
import {FiLoader} from "react-icons/fi";
import whatsappImage from "../../assets/images/whatsapp.webp";

import {
    LoadIcon,
    Container,
    AreaFiliados,
    Filiados,
    AreaPrincipal,
    InputBuscar,
    Titulo,
    LojaLogo,
    Parceiros,
    Parceiro,
    ImagemCampanha,
    Produtos,
    Produto,
    Stickys,
    CompreAgoraPrincipal,
    ToastPromocao
} from "./styles";

class Loja extends Component{
    state = {
        loja: {},
        produtosBuscaTemp: {},
        busca: "",
        loading: true,
    }
    async componentDidMount(){
        const response = await api.get("/cliente");
        const {dispatch} = this.props;
        let data = response.data[0];
        console.log(response)
        console.log(data)
        if (data.produtos){
            data.produtos = data.produtos.map(produto => ({
                ...produto,
                precoFormatado: formatarPreco(produto.preco)
            }))
        }
        
        this.setState({loja: data, produtosBuscaTemp: data, loading: false})
        dispatch(addLoja(data));
    }
    handleAddProduto = (produto) =>{
        const {dispatch} = this.props;
        dispatch(addProdutoCarrinho(produto))
    }
    handleClickProduto = (produto) =>{
        const {history} = this.props;
        history.push(`/produto/${produto._id}`)
    }
    handleBuscar = async (e)=>{

        await this.setState({busca: e.target.value})

        let loja = {...this.state.produtosBuscaTemp};        
        loja.produtos = loja.produtos.filter(produto => 
            produto.descricao
            .normalize("NFD")
            .toUpperCase()
            .includes(this.state.busca.normalize("NFD").toUpperCase()));
            
        this.setState({loja});
    }
    render(){
        const {loja, loading} = this.state;
        const url = api.defaults.baseURL;
        return (            
            (!loading)
            ?<Container>
                <AreaFiliados>
                    <Titulo>Filiados</Titulo>
                    <Filiados>
                        {
                            loja.filiados && loja.filiados.map(filiado => (
                                <li key={filiado._id}>
                                    <img src={`${url}/img/filiados/${filiado.logo}`} alt={filiado.nome}/>
                                    <p>{filiado.endereco}</p>
                                    <h4>{filiado.nome}</h4>
                                    {filiado.telefone && 
                                        <a href={`https://api.whatsapp.com/send?phone=55${filiado.telefone}`}>Compre agora <FaWhatsapp size="20px"/></a>
                                    }
                                </li>
                            ))
                        }
                    </Filiados>
                </AreaFiliados>
                <AreaPrincipal>
                    <LojaLogo src={`${url}/img/logos/${loja.logo}`}/>
                    <Titulo>Parceiros</Titulo>
                    <Parceiros>
                            {
                                loja.parceiros && loja.parceiros.map(parceiro => (
                                    <Parceiro key={parceiro._id}>
                                        <img src={`${url}/img/parceiros/${parceiro.logo}`} alt={parceiro.nome}/>
                                    </Parceiro>
                                ))
                            }
                    </Parceiros>
                    <ImagemCampanha src={`${url}/img/logos/${loja.imagemCampanha}`}/>
                    <InputBuscar onChange={this.handleBuscar} type="text" placeholder="Pesquisar um produto"/>
                    <Produtos>
                        {
                            loja.produtos && loja.produtos.map(produto => (
                                <Produto key={produto._id} onClick={()=> this.handleClickProduto(produto)}>
                                    <img src={`${url}/img/produtos/${produto.imagem}`} alt={produto.descricao}/>
                                    <div>
                                        <p>{produto.descricao}</p>
                                        <div>
                                            <p>{produto.precoFormatado}</p>  
                                            <button onClick={() => this.handleAddProduto(produto)}><FaCartPlus/></button>                                     
                                            
                                        </div>
                                    </div>
                                </Produto>
                            ))
                        }
                    </Produtos>
                    {/* <Stickys>
                        <ToastPromocao>
                            <div>
                                Arraiá de promoções
                            </div>
                            <div>
                                Compre uma feira e ganhe 10% de desconto
                            </div>
                        </ToastPromocao>
                        {
                            loja.whatsapp &&
                            <CompreAgoraPrincipal href={`https://api.whatsapp.com/send?phone=55${loja.whatsapp}`}>
                                <img src={whatsappImage}/>
                                <div>Compre Agora</div>                        
                            </CompreAgoraPrincipal>
                        } 
                    </Stickys> */}
                                       
                </AreaPrincipal>                              
            </Container> 
            : <LoadIcon>
                <FiLoader size="64px"/> 
            </LoadIcon>          
        );
    }    
}
export default connect()(Loja);