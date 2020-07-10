const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginPage = (req, res)=>{
    res.render("login", {userLogado: req.user});
}
const login = async (req, res)=>{
    try {
        let token;
        if (req.body.email == process.env.ROOT_USER && req.body.password == process.env.ROOT_PASSWORD){
            token = jwt.sign({_id: process.env.ROOT_USER}, process.env.TOKEN_SECRET);
        }        
        else{
            let selectedUser = await User.findOne({email: req.body.email});
            if (!selectedUser)
                return res.status(400).json({message: "Usuário ou senha incorreto(a)"}); 
            const passwordMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
            if(!passwordMatch)
                return res.status(400).json({message: "Usuário ou senha incorreto(a)"}); 
            token = jwt.sign({_id: selectedUser._id}, process.env.TOKEN_SECRET);
        }
        res.cookie("authorization-token", token);
        return res.json({message: "Usuário autenticado"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Houve um erro ao fazer o login"});
    }
    
}
const inserir = async (req, res)=>{    
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        privilegio: req.body.privilegio
    });
    try {        
        let doc = await user.save();
        res.json({message: "Usuário registrado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Houve um erro ao registrar o usuário"});
    }
}
const editar = async (req, res)=>{
    try {
        let idUsuario = req.headers.idusuario;
        let userEditar = req.body;

        let user = await User.findById(idUsuario);
        user.name = userEditar.name;
        user.email = userEditar.email;
        user.privilegio = userEditar.privilegio;
        if (userEditar.password)
            user.password =  bcrypt.hashSync(userEditar.password);
        await user.save();
        return res.json({message: "O usuário foi editado com sucesso"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Houve um erro ao editar o usuário"});
    }
    
}
const validar = async (req, res, next)=>{
    let user = req.body;
    idUsuario = req.headers.idusuario;
    try {
        let usersCadastrados = await User.find({email: user.email});
        if (usersCadastrados.length > 0 && usersCadastrados[0]._id != idUsuario){
            return res.status(400).json({message: `Já existe um usuário cadastrado com o E-mail "${user.email}"`});
        }
        else if (!user.name){
            return res.status(400).json({message: "Por favor, insira um nome para o usuário"});
        }
        else if (user.name.length < 4 || user.name.length > 150){
            return res.status(400).json({message: "Por favor, insira um nome de usuário que contenha entre 4 e 150 caracteres"});
        }
        else if (!user.email ){
            return res.status(400).json({message: "Por favor, insira um e-mail para o usuário"});
        }
        else if (user.email.length < 4 || user.email.length > 300){
            return res.status(400).json({message: "Por favor, insira um e-mail que contenha entre 4 e 300 caracteres"});
        }        
        else if (req.method == "POST" && user.password.length < 8){
            return res.status(400).json({message: "A senha não pode ser menor que 8 caracteres"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Houve um erro ao validar as informações!"});
    }
}
const editarClientesLiberados = async (req, res)=>{
    try {
        let idUsuario = req.headers.idusuario;
        let clientesLiberados = req.body;
        await User.findOneAndUpdate({_id: idUsuario}, {$set: {"clientes": clientesLiberados}});
        return res.json({message: "Clientes liberados editados com sucesso"});
    } catch (error) {
        return res.status(500).json({message: "Houve um erro ao editar os clientes liberados"});
    }
}
const excluir = async (req, res)=>{
    try {
        let idUsuario = req.headers.idusuario;
        console.log(idUsuario);
        await User.findByIdAndDelete(idUsuario);
        return res.json({message: "Usuário excluído com sucesso"});
    } catch (error) {
        return res.status(500).json({message: "Houve um erro ao excluir o usuário"});   
    }
}
const validarPrivilegioUsuario = async (req, res, next)=>{
    if (req.user.privilegio < 2)
        next();
    else
        return res.status(403).json({message: "O usuário não tem permissão para a ação"}); 

 }
const logout = async (req, res)=>{
    res.clearCookie("authorization-token");
    res.redirect("/admin");
}
module.exports = {
    loginPage,
    login,
    inserir,
    editar,
    validar,
    editarClientesLiberados,
    excluir,
    validarPrivilegioUsuario,
    logout
}