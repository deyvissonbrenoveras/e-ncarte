(this["webpackJsonpe-ncarte_react"]=this["webpackJsonpe-ncarte_react"]||[]).push([[0],{47:function(n,e,t){n.exports=t.p+"static/media/logo.77b303cd.png"},50:function(n,e,t){n.exports=t(78)},77:function(n,e,t){n.exports=t.p+"static/media/whatsapp.3148f0ac.webp"},78:function(n,e,t){"use strict";t.r(e);var r=t(1),a=t.n(r),o=t(24),i=t.n(o),c=t(16),l=t(2),u=t(3);function d(){var n=Object(l.a)(["\n    *{\n        padding: 0;\n        margin: 0;\n    }\n    html, body {\n        height: 100%;\n    }\n    body{\n        --cor-padrao: rgb(237, 47, 87);\n        background: #f7f7f7;\n        font-family: Arial, Helvetica, sans-serif;\n    }\n    input, button {\n        border: none;\n        outline: 0;\n    }\n    button:hover{\n        cursor: pointer;\n    }\n    a {\n        color: #000000;\n        text-decoration: none;\n    }\n"]);return d=function(){return n},n}var p=Object(u.a)(d()),s=t(13),f=t(18),m=t(12),b=t(25);var x=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"@carrinho/ADD":return Object(b.a)(n,(function(n){var t=n.findIndex((function(n){return n._id===e.produto._id}));t>=0?n[t].quantidade++:n.push(Object(m.a)(Object(m.a)({},e.produto),{},{quantidade:1}))}));case"@carrinho/ATUALIZAR_QUANTIDADE":return e.quantidade<=0?n:Object(b.a)(n,(function(n){var t=n.findIndex((function(n){return n._id===e._id}));t>=0&&(n[t].quantidade=Number(e.quantidade))}));case"@carrinho/REMOVER":return Object(b.a)(n,(function(n){var t=n.findIndex((function(n){return n._id===e._id}));t>=0&&n.splice(t,1)}));default:return n}};var g=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"@loja/ADD":return e.loja;default:return n}},h=Object(f.b)({carrinho:x,loja:g}),v=Object(f.c)(h),j="min-width: 576px",E="min-width: 992px";function y(){var n=Object(l.a)(["\n    display: flex;\n    list-style: none; \n    align-items: center;\n    padding: 0 5px;\n    margin-top: 5px;\n    li {\n        display: flex;\n        align-items: center;\n        margin: 0 10px;\n    }\n    a {     \n        font-size: 0.7em;   \n        color: var(--cor-padrao);\n        text-decoration: none;\n        font-weight: 550;\n    }\n"]);return y=function(){return n},n}function w(){var n=Object(l.a)(["\n    max-width: 1200px;\n    margin: 0 auto;\n    /* width: 100%; */\n    /* border: 1px solid red; */\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: center;\n    padding: 0 5px;\n    min-height: 30px;\n    @media (","){\n        justify-content: space-between;\n    }\n\n    img{\n        width: 64px;\n    }\n\n"]);return w=function(){return n},n}var O=u.b.div(w(),j),k=u.b.ul(y()),z=t(47),A=t.n(z),C=t(10);function _(){return a.a.createElement(O,null,a.a.createElement("img",{src:A.a,alt:"e-ncarte"}),a.a.createElement(k,null,a.a.createElement("li",null,a.a.createElement(c.b,{to:"/carrinho"},a.a.createElement(C.e,{size:"20px",color:"var(--cor-padrao)"}))),a.a.createElement("li",null,a.a.createElement(c.b,{to:"/react"},"Loja")),a.a.createElement("li",null,a.a.createElement(c.b,{to:"/contato"},"Contact"))))}var D=t(5),R=t(23),q=t.n(R),I=t(30),B=t(19),F=t(20),N=t(22),P=t(21),T=t(48),U=t.n(T).a.create({baseURL:"https://e-ncarte.com"}),L=Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format;function M(n){return{type:"@carrinho/ADD",produto:n}}function S(n,e){return{type:"@carrinho/ATUALIZAR_QUANTIDADE",_id:n,quantidade:e}}var V=t(49);t(77);function H(){var n=Object(l.a)(["\n    text-align: center;\n    font-size: 0.7em;\n    width: 80px;\n    background-color: rgba(224, 224, 224, 0.397);\n    border-radius: 4px;\n    font-weight: bold;\n    &:hover {\n        cursor: pointer;\n        background-color: rgb(224, 224, 224);\n    }\n    img {\n        margin: 0 auto;\n        width: 52px;\n    }\n"]);return H=function(){return n},n}function J(){var n=Object(l.a)(["\n    background: #fff;\n    border-radius: 4px;\n    bottom: 5px;\n"]);return J=function(){return n},n}function Q(){var n=Object(l.a)(["\n    border: 1px solid red;\n    display: flex;\n    justify-content: flex-end;\n    position: sticky;\n    bottom: 5px;\n\n"]);return Q=function(){return n},n}function Z(){var n=Object(l.a)(["\n    width: 100%;\n    min-height: 64px;\n    display: flex;\n    justify-content: space-between;   \n    align-items: center;         \n    padding: 5px;\n    margin: 5px 5px;\n    border-radius: 3px;\n    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);\n    @media(","){\n        max-width: 45%;\n    }\n    @media(","){\n        max-width: 30%;\n    }\n    &:hover{\n        cursor: pointer;\n    }\n    img {\n        height: 45px;\n    }\n    > div {\n        display: flex;\n        align-items: flex-end;\n        flex-direction: column;\n        justify-content: space-around;\n        margin-right: 10px;\n        height: 100%;\n        >p {\n            text-align: right;\n            font-size: 0.8em;\n        }\n        div {\n            display: flex;\n            align-items: center;\n            margin-right: 5px;\n            p {\n                margin-right: 5px;\n                padding: 1px;\n                font-size: 0.9em;\n                font-weight: bold;\n                font-style: italic;\n                color: #ff0000;\n                background: yellow;\n                border-radius: 2px;\n            }\n            button {\n                width: 10px;\n                background: #fff;\n                color: var(--cor-padrao);\n\n            }\n        }               \n    }         \n"]);return Z=function(){return n},n}function G(){var n=Object(l.a)([" \n    margin-top: 5px;\n    list-style: none;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n"]);return G=function(){return n},n}function K(){var n=Object(l.a)(["\n    display: block;\n    width: 100%;\n    border-radius: 10px;\n    min-width: 200px;\n    margin: 0 3px;\n"]);return K=function(){return n},n}function W(){var n=Object(l.a)(["\n    margin: 10px;\n    img {\n        border-radius: 10px;\n        max-height: 45px;\n    }\n"]);return W=function(){return n},n}function X(){var n=Object(l.a)(["\n    padding: 3px;  \n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n    flex-wrap: wrap;\n    list-style: none;\n"]);return X=function(){return n},n}function Y(){var n=Object(l.a)(["\n    color: var(--cor-padrao);\n    font-size: 0.9em;\n    margin: 0 auto;\n    text-align: center;\n"]);return Y=function(){return n},n}function $(){var n=Object(l.a)(["\n    display: block;\n    width: 130px;\n    margin: 0 auto;\n"]);return $=function(){return n},n}function nn(){var n=Object(l.a)(["\n    list-style: none;    \n    display: flex;\n    flex-wrap: wrap;\n    flex-direction: column;\n    background: #fff;\n    align-items: center;\n    justify-content: center;\n    @media (","){\n        flex-direction: row;\n        justify-content: space-around;\n    }\n    li{\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: space-around;\n        text-align: center;\n        margin-top: 10px;\n        border-bottom: 1px solid;\n        border-color: #c3c3c3;\n        padding-bottom: 5px;    \n        height: 120px;    \n        @media (","){\n            max-width: 250px;\n        }\n        img{\n            width: 64px;\n        }\n        p {\n            padding: 10px;\n            font-size: 0.7em;\n        }\n        h4 {\n            font-size: 0.7em;\n        }\n        a{\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            padding: 0 5px;\n            margin: 5px;\n            font-size: 0.7em;\n            svg {\n                margin-left: 5px;\n                padding: 1px;\n                border-radius: 15px;\n                background: #25d366;\n                color: #fff;\n            }\n        }\n        \n    }\n"]);return nn=function(){return n},n}function en(){var n=Object(l.a)(["\n    order: 2;\n    width: 100%;\n    @media (","){\n        width: 230px;\n        order: 1\n    } \n"]);return en=function(){return n},n}function tn(){var n=Object(l.a)(["\n    display: block;\n    width: 100%;\n    border-bottom: 1px solid;\n    border-color: #c3c3c3;\n    margin: 5px auto;\n    text-align: center;\n    font-size: 1em;\n    font-weight: 400;\n    padding: 2px;\n    color: var(--cor-padrao);\n    @media (","){\n        width: 300px;\n    }\n"]);return tn=function(){return n},n}function rn(){var n=Object(l.a)(["\n    order: 1;\n    padding: 5px;\n    max-width: 900px;\n    min-height: 240px;   \n    @media (","){\n        order: 2;\n    } \n"]);return rn=function(){return n},n}function an(){var n=Object(l.a)(["\n    display: flex;\n    justify-content: space-around;\n    flex-wrap: wrap;\n    > div {\n        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);\n        margin: 10px auto;\n        border-radius: 10px;\n        background: #fff;\n    }\n    @media (","){\n        flex-wrap: nowrap;\n    } \n"]);return an=function(){return n},n}function on(){var n=Object(l.a)(["\n    margin-top: 30px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;    \n\n    svg {       \n        @keyframes girar {\n             from {transform: rotate(0);} \n             to {transform: rotate(360deg); }\n        }\n        animation: girar 2s linear infinite; \n        color: #c9c9c9;        \n    }\n"]);return on=function(){return n},n}var cn=u.b.div(on()),ln=u.b.div(an(),E),un=u.b.div(rn(),E),dn=u.b.input(tn(),j),pn=u.b.div(en(),E),sn=u.b.ul(nn(),j,j),fn=u.b.img($()),mn=u.b.h3(Y()),bn=u.b.ul(X()),xn=u.b.li(W()),gn=u.b.img(K()),hn=u.b.ul(G()),vn=u.b.li(Z(),j,E),jn=(u.b.div(Q()),u.b.div(J()),u.b.a(H()),function(n){Object(N.a)(t,n);var e=Object(P.a)(t);function t(){var n;Object(B.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=e.call.apply(e,[this].concat(a))).state={loja:{},produtosBuscaTemp:{},busca:"",loading:!0},n.handleAddProduto=function(e){(0,n.props.dispatch)(M(e))},n.handleClickProduto=function(e){n.props.history.push("/produto/".concat(e._id))},n.handleBuscar=function(){var e=Object(I.a)(q.a.mark((function e(t){var r;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setState({busca:t.target.value});case 2:(r=Object(m.a)({},n.state.produtosBuscaTemp)).produtos=r.produtos.filter((function(e){return e.descricao.normalize("NFD").toUpperCase().includes(n.state.busca.normalize("NFD").toUpperCase())})),n.setState({loja:r});case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),n}return Object(F.a)(t,[{key:"componentDidMount",value:function(){var n=Object(I.a)(q.a.mark((function n(){var e,t,r;return q.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,U.get("/cliente");case 2:e=n.sent,t=this.props.dispatch,r=e.data[1],console.log(e),r.produtos&&(r.produtos=r.produtos.map((function(n){return Object(m.a)(Object(m.a)({},n),{},{precoFormatado:L(n.preco)})}))),this.setState({loja:r,produtosBuscaTemp:r,loading:!1}),t({type:"@loja/ADD",loja:r});case 9:case"end":return n.stop()}}),n,this)})));return function(){return n.apply(this,arguments)}}()},{key:"render",value:function(){var n=this,e=this.state,t=e.loja,r=e.loading,o=U.defaults.baseURL;return r?a.a.createElement(cn,null,a.a.createElement(V.a,{size:"64px"})):a.a.createElement(ln,null,a.a.createElement(pn,null,a.a.createElement(mn,null,"Filiados"),a.a.createElement(sn,null,t.filiados&&t.filiados.map((function(n){return a.a.createElement("li",{key:n._id},a.a.createElement("img",{src:"".concat(o,"/img/filiados/").concat(n.logo),alt:n.nome}),a.a.createElement("p",null,n.endereco),a.a.createElement("h4",null,n.nome),n.telefone&&a.a.createElement("a",{href:"https://api.whatsapp.com/send?phone=55".concat(n.telefone)},"Compre agora ",a.a.createElement(C.f,{size:"20px"})))})))),a.a.createElement(un,null,a.a.createElement(fn,{src:"".concat(o,"/img/logos/").concat(t.logo)}),a.a.createElement(mn,null,"Parceiros"),a.a.createElement(bn,null,t.parceiros&&t.parceiros.map((function(n){return a.a.createElement(xn,{key:n._id},a.a.createElement("img",{src:"".concat(o,"/img/parceiros/").concat(n.logo),alt:n.nome}))}))),a.a.createElement(gn,{src:"".concat(o,"/img/logos/").concat(t.imagemCampanha)}),a.a.createElement(dn,{onChange:this.handleBuscar,type:"text",placeholder:"Pesquisar um produto"}),a.a.createElement(hn,null,t.produtos&&t.produtos.map((function(e){return a.a.createElement(vn,{key:e._id,onClick:function(){return n.handleClickProduto(e)}},a.a.createElement("img",{src:"".concat(o,"/img/produtos/").concat(e.imagem),alt:e.descricao}),a.a.createElement("div",null,a.a.createElement("p",null,e.descricao),a.a.createElement("div",null,a.a.createElement("p",null,e.precoFormatado),a.a.createElement("button",{onClick:function(){return n.handleAddProduto(e)}},a.a.createElement(C.a,null)))))})))))}}]),t}(r.Component)),En=Object(s.b)()(jn);function yn(){var n=Object(l.a)(["\n    border-radius: 10px;\n    padding: 5px;\n    border: 1px solid;\n    display: block;\n    margin: 5px auto 0 auto;\n    color: #fff;\n    background: var(--cor-padrao);\n    &:hover {\n        color: var(--cor-padrao);\n        background: #fff;\n    }\n"]);return yn=function(){return n},n}function wn(){var n=Object(l.a)(["\n    margin-left: 10px;\n    padding: 1px;\n    color: #ff0000;    \n    font-weight: bold;\n    font-style: italic;\n    background: yellow;\n    font-size: 0.7em;\n    border-radius: 2px;\n    display: inline;\n"]);return wn=function(){return n},n}function On(){var n=Object(l.a)(["\n    margin-left: 10px;\n    margin-top: 5px;\n    font-size: 0.8em;\n    font-weight: 400;\n"]);return On=function(){return n},n}function kn(){var n=Object(l.a)(["\n    margin: 0 auto;\n    width: 80%;\n    height: 200px;\n    border-bottom: 1px solid;\n    border-color: #c3c3c3;\n    display: flex;\n    align-items: center;\n    img {\n        padding: 10px;\n        display: block;\n        margin: 0 auto;\n        height: 100px;\n    }\n"]);return kn=function(){return n},n}function zn(){var n=Object(l.a)(["\n    padding: 10px 0;\n"]);return zn=function(){return n},n}function An(){var n=Object(l.a)(["\n    background: #fff;\n"]);return An=function(){return n},n}var Cn=u.b.div(An()),_n=u.b.div(zn()),Dn=u.b.div(kn()),Rn=u.b.h3(On()),qn=u.b.p(wn()),In=u.b.button(yn()),Bn=function(n){Object(N.a)(t,n);var e=Object(P.a)(t);function t(){var n;Object(B.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=e.call.apply(e,[this].concat(a))).handleAddProduto=function(e){(0,n.props.dispatch)(M(e))},n}return Object(F.a)(t,[{key:"render",value:function(){var n=this,e=this.props,t=e.loja,r=e.match,o=t.produtos.filter((function(n){return n._id===r.params.id}))[0];return a.a.createElement(Cn,null,a.a.createElement(_n,null,a.a.createElement(Dn,null,a.a.createElement("img",{src:"https://e-ncarte.com/img/produtos/".concat(o.imagem)})),a.a.createElement(Rn,null,o.descricao),a.a.createElement(qn,null,o.precoFormatado),a.a.createElement(In,{onClick:function(){return n.handleAddProduto(o)}},"ADICIONAR AO CARRINHO ",a.a.createElement(C.a,null))))}}]),t}(r.Component);var Fn=Object(s.b)((function(n){return{loja:n.loja}}))(Bn);function Nn(){return a.a.createElement("div",null,"Contato")}function Pn(){var n=Object(l.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    color: #d9d9d9;\n    svg {\n        color: #d9d9d9;\n    }\n"]);return Pn=function(){return n},n}function Tn(){var n=Object(l.a)(["\n    margin-top: 20px;\n    text-align: right;\n    font-size: 1em;\n"]);return Tn=function(){return n},n}function Un(){var n=Object(l.a)(["\n    height: 42px;\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n    flex-direction: column;\n    font-size: 0.6em;\n    padding: 3px;\n    p {\n        text-align: center;\n        color: var(--cor-padrao);\n        font-weight: bold;\n    }\n    button {\n        background: #fff;\n        svg {\n           height: 8px;\n        }\n    }\n"]);return Un=function(){return n},n}function Ln(){var n=Object(l.a)(["\n    display: flex;\n    align-items: center;\n    margin: 0 5px;\n    input {\n        width: 24px;\n        height: 15px;\n        font-size: 0.7em;\n        text-align: center;\n    }\n    button {\n        background: #fff;\n        svg {\n            width: 12px;\n        }\n    }\n"]);return Ln=function(){return n},n}function Mn(){var n=Object(l.a)(["\n    display: flex;\n    align-items: center;\n    width: 100%;\n    padding: 3px;\n    img{\n        width: 30px;\n    }\n    > div {\n        margin-left: 5px;\n        display: flex;\n        flex-direction: column;\n        /* align-items: flex-end; */\n        justify-content: space-between;\n        /* text-align: right; */\n        p:first-child {\n            font-size: 0.6em;\n        }\n        > div {\n            display: flex;\n            flex-direction: row;\n            margin-top: 5px;\n            p:first-child {\n                padding: 3px;\n                font-size: 0.7em;\n                font-weight: bold;\n                font-style: italic;\n                color: #ff0000;\n                background: yellow;\n                border-radius: 4px;\n            }\n        }\n        \n    }\n"]);return Mn=function(){return n},n}function Sn(){var n=Object(l.a)(["\n    margin-top: 10px;\n    padding: 5px 5px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-radius: 3px;\n    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);\n\n"]);return Sn=function(){return n},n}function Vn(){var n=Object(l.a)(["\n    list-style: none;\n"]);return Vn=function(){return n},n}function Hn(){var n=Object(l.a)(["\n    margin: 30px auto;\n    max-width: 900px;\n    min-height: 130px;\n    background: #fff;\n    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);\n    border-radius: 10px;\n    padding: 10px;\n"]);return Hn=function(){return n},n}var Jn=u.b.div(Hn()),Qn=u.b.ul(Vn()),Zn=u.b.li(Sn()),Gn=u.b.div(Mn()),Kn=u.b.div(Ln()),Wn=u.b.div(Un()),Xn=u.b.h3(Tn()),Yn=u.b.div(Pn()),$n=function(n){Object(N.a)(t,n);var e=Object(P.a)(t);function t(n){var r;return Object(B.a)(this,t),(r=e.call(this,n)).incrementar=function(n){(0,r.props.dispatch)(S(n._id,n.quantidade+1))},r.decrementar=function(n){(0,r.props.dispatch)(S(n._id,n.quantidade-1))},r.remover=function(n){(0,r.props.dispatch)(function(n){return{type:"@carrinho/REMOVER",_id:n}}(n))},r}return Object(F.a)(t,[{key:"render",value:function(){var n=this,e=this.props,t=e.carrinho,r=e.total;return a.a.createElement(Jn,null,t.length>0?a.a.createElement(Qn,null,t.map((function(e){return a.a.createElement(Zn,null,a.a.createElement(Gn,null,a.a.createElement("img",{src:"https://e-ncarte.com/img/produtos/".concat(e.imagem),alt:e.descricao}),a.a.createElement("div",null,a.a.createElement("p",null,e.descricao),a.a.createElement("div",null,a.a.createElement("p",null,e.precoFormatado),a.a.createElement(Kn,null,a.a.createElement("button",{onClick:function(){return n.decrementar(e)}},a.a.createElement(C.b,{size:"12px",color:"var(--cor-padrao)"})),a.a.createElement("input",{type:"text",value:e.quantidade}),a.a.createElement("button",{onClick:function(){return n.incrementar(e)}},a.a.createElement(C.c,{size:"12px",color:"var(--cor-padrao)"})))))),a.a.createElement(Wn,null,a.a.createElement("p",null,e.subtotal),a.a.createElement("button",{onClick:function(){return n.remover(e._id)}},a.a.createElement(C.d,{size:"16px"}))))})),a.a.createElement(Xn,null,"Total: ",r)):a.a.createElement(Yn,null,a.a.createElement(C.e,{size:"80px"}),"Carrinho Vazio"))}}]),t}(r.Component),ne=Object(s.b)((function(n){return{carrinho:n.carrinho.map((function(n){return Object(m.a)(Object(m.a)({},n),{},{subtotal:L(n.quantidade*n.preco)})})),total:L(n.carrinho.reduce((function(n,e){return n+e.preco*e.quantidade}),0))}}))($n);function ee(){return a.a.createElement(D.c,null,a.a.createElement(D.a,{exact:!0,path:"/react",component:En}),a.a.createElement(D.a,{path:"/produto/:id",component:Fn}),a.a.createElement(D.a,{path:"/contato",component:Nn}),a.a.createElement(D.a,{path:"/carrinho",component:ne}))}function te(){return a.a.createElement(s.a,{store:v},a.a.createElement(c.a,null,a.a.createElement(_,null),a.a.createElement(ee,null),a.a.createElement(p,null)))}i.a.render(a.a.createElement(te,null),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.009ce2ee.chunk.js.map