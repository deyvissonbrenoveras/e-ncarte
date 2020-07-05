let jwt = require("jsonwebtoken");
let User = require("../models/User");
let Cliente = require("../models/Cliente");

async function autenticarUsuario(req, res){
    let cookies = parseCookies(req);
    if(!cookies["authorization-token"])
        return false;
    const userVerified = jwt.verify(cookies["authorization-token"], process.env.TOKEN_SECRET);
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
            return res.render("login", { clientes });  
        } 
    catch (error) {
        return res.render("index");  
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
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
module.exports = {
    autenticacaoPagina,
    autenticacaoAPI
}