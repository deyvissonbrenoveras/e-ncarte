import {combineReducers} from "redux";

import carrinho from "./carrinho/reducer";
import loja from "./loja/reducer";

export default combineReducers({
    carrinho,
    loja
})