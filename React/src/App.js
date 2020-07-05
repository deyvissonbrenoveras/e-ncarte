import React from "react";
import {BrowserRouter} from "react-router-dom";

import GlobalStyles from "./styles/global";

import {Provider} from "react-redux";
import store from "./store/index";

import Header from "./components/Header";
import Routes from "./routes";

export default function App(){
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <Routes/>
                <GlobalStyles/>
            </BrowserRouter>
        </Provider>
        
    );
}