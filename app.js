const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

//Require Rotas
const clienteRouter = require("./routes/clienteRouter");
const adminRouter = require("./routes/adminRouter");
const siteRouter = require("./routes/siteRouter");
const produtoRouter = require("./routes/produtoRouter");
const userRouter = require("./routes/userRouter");
const filiadoRouter = require("./routes/filiadoRouter");
const cuponsPromocionaisRouter = require("./routes/cuponsPromocionaisRouter");
const parceiroRouter = require("./routes/parceiroRouter");
//Middleware de autenticação
const auth = require("./controllers/authController");

//Cors
app.use(cors())
//Mongodb
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true },
    (error)=>{
        if (error)
            console.log(error);
        else
            console.log("Mongo DB conectado.");
    }
);

//Configuração do renderizador EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Forçar SSL
app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if (req.headers["x-forwarded-proto"] == "http") //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

//Rotas estáticas
app.use("/", express.static("./public"));
app.use("/loja/:nomeUrl", express.static("./React/build/index.html"));
app.use("/loja", express.static("./React/build"));
//Rota site
app.use("/", siteRouter);

//Rota User
app.use("/user", express.json(), userRouter);

//Rota Cliente
app.use("/cliente", express.json({limit: "30MB"}), clienteRouter);

//Rota Produto
app.use("/produto", express.json({limit: "30MB"}), produtoRouter);
//Rota Filiado
app.use("/filiado", express.json({limit: "30MB"}), filiadoRouter);
//Rota Parceiros
app.use("/parceiro", parceiroRouter);

//Rota Admin
app.use("/admin", auth.autenticacaoPagina, adminRouter);

//Rota Cupons Promocionais
app.use("/cupons", express.json(), cuponsPromocionaisRouter);

//Inicia servidor
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
});