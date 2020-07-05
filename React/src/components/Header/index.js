import React from "react";
import {Link} from "react-router-dom";

import {Container, Menu} from "./styles";
import logo from "../../assets/images/logo.png";

import {FaShoppingCart} from "react-icons/fa";

export default function Header(){
    return (
        <Container>
            <img src={logo} alt="e-ncarte"/>
             <Menu>
                <li><Link to="/carrinho"><FaShoppingCart size="20px" color={"var(--cor-padrao)"}/></Link></li>
                <li><Link to="/react">Loja</Link></li>
                <li><Link to="/contato">Contact</Link></li>
            </Menu>
        </Container>
       
    );
}