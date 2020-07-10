let jwt = require("jsonwebtoken");
let User = require("../models/User");
let Cliente = require("../models/Cliente");

async function autenticarUsuario(req, res){
    const authorizationTokenCookie = req.cookies["authorization-token"];
    if(!authorizationTokenCookie)
        return false;
    const userVerified = jwt.verify(authorizationTokenCookie, process.env.TOKEN_SECRET);
    req.user = userVerified;
    if (process.env.ROOT_USER == userVerified._id){
        req.user.privilegio = 0;
    }
    else {
        req.user = await User.findById(userVerified._id);
        req.user.password = undefined;
    }
    return true;
}

const autenticacaoPagina = async function (req, res, next){

    try {
        let clientes = await Cliente.find();
        if (!await autenticarUsuario(req, res))            
            return res.render("login", { clientes, userLogado: null });  
        } 
    catch (error) {
        return res.render("index", { clientes, userLogado: req.user });  
    }   
    next();   
}
const autenticacaoAPI = async (req, res, next)=>{
    try {
        if (!await autenticarUsuario(req, res))
            return res.status(403).json({message: "Usuário não autenticado"});  
        } 
    catch (error) {
        return res.status(403).json({message: "Usuário não autenticado"});  
    } 
    next();
}
module.exports = {
    autenticacaoPagina,
    autenticacaoAPI
}