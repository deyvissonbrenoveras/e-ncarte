import React from "react";
import {Switch, Route} from "react-router-dom";


import Loja from "./pages/Loja/index";
import Produto from "./pages/Produto/index";
import Contato from "./pages/Contato/index";
import Carrinho from "./pages/Carrinho/index";

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/react" component={Loja}/>
            <Route path="/produto/:id" component={Produto}/>
            <Route path="/contato" component={Contato}/>
            <Route path="/carrinho" component={Carrinho}/>
        </Switch>
    );
}