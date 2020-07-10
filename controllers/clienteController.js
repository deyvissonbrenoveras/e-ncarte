const Cliente = require("../models/Cliente");
const User = require("../models/User");
const fs = require("fs");
const imgController = require("./imgController");
const CLIENTE_LOGO_FOLDER = imgController.CLIENTE_LOGO_FOLDER;
const PRODUTO_IMG_FOLDER = require("./produtoController").PRODUTO_IMG_FOLDER;
const FILIADO_IMG_FOLDER = require("./filiadoController").FILIADO_IMG_FOLDER;

const selecionar = async (req, res) => {
    var fullUrl = "https" + '://' + req.get('host') + req.originalUrl;
    let clientes = await Cliente.find()
    for (let client of clientes) {
        if (req.params.nomeUrl === client.nomeUrl) {
            return res.render("cliente", {cliente: client, userLogado: req.user, clientes, url: fullUrl})
        }
    }
    res.render("cliente_nao_encontrado", { clientes })
}

const inserir = async (req, res) => {        
    try {     
        let logoPath =  req.body.nomeUrl + "." + req.body.logo.contentType;
        imgController.salvarImg(req.body.logo.data, CLIENTE_LOGO_FOLDER, logoPath);
        req.body.logo = logoPath;

        let campanhaPath =  req.body.nomeUrl + "-Campanha." + req.body.imagemCampanha.contentType;
        imgController.salvarImg(req.body.imagemCampanha.data, CLIENTE_LOGO_FOLDER, campanhaPath);
        req.body.imagemCampanha = campanhaPath;
                
        let cliente = new Cliente(req.body);       

        await cliente.save();
        res.json({ message: `O cliente "${cliente.nome}" foi cadastrado com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: "Houve um erro ao cadastrar o cliente" });
    }



}
const editar = async (req, res) => {  
    try {
        let cliente = req.body;
        let idCliente = req.headers["idcliente"];        
        let cli = await Cliente.findById(idCliente);

        
        if (cliente.logo){
            let logoPath = cliente.nomeUrl + "." + cliente.logo.contentType;
            imgController.editarImg(cliente.logo, cli.logo, logoPath, cli.nomeUrl);
            cliente.logo = logoPath;
        }
        else{            
            cliente.logo = imgController.renomearImg(cli.logo, cliente.nomeUrl);
        }
        
        if (cliente.imagemCampanha){
            let campanhaPath = cliente.nomeUrl + "-Campanha." + cliente.imagemCampanha.contentType;
            imgController.editarImg(cliente.imagemCampanha, cli.imagemCampanha, campanhaPath, cli.nomeUrl);
            cliente.imagemCampanha = campanhaPath;
        }
        else{
            cliente.imagemCampanha = imgController.renomearImg(cli.imagemCampanha, cliente.nomeUrl);
        }
        await Cliente.findOneAndUpdate({_id: idCliente}, cliente, {useFindAndModify: false});
        return res.json({ message: `O cliente "${cliente.nome}" foi editado com sucesso` });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Houve um erro ao editar o cliente" });
    }  
}
const validarCliente = async (req, res, next) => {
    let cliente = req.body;
    let idCliente = req.headers.idcliente;
    //Necessário utilizar expressão regular para dar um replace em todas as ocorrências da string
    //The g modifer makes the search global.
    cliente.nomeUrl = cliente.nomeUrl.replace(/ /g, "").toLowerCase();
    if (cliente.nome.length < 3 || cliente.nome.length > 150)
        return res.status(400).json({message: "Por favor, insira um nome que possua entre 3 e 150 caracteres"});
    else if (cliente.nomeUrl.length < 3 || cliente.nomeUrl.length > 100)
        return res.status(400).json({message: "Por favor, insira uma URL que possua entre 3 e 100 caracteres"});
    else{
        //verifica se já existe um cliente com o mesmo nomeUrl  
        try{
            let clienteValidacaoUrl = await Cliente.find({nomeUrl: req.body.nomeUrl});
            if (clienteValidacaoUrl.length > 0 && clienteValidacaoUrl[0]._id != idCliente){
                return res.status(400).json({message: `Já existe um cliente cadastrado com a url "${req.body.nomeUrl}"`});
            }
        }
        catch (error){
            console.log(error);
            return res.status(500).json({message: "Houve um erro ao validar as informações!"});
        }        
    }    
    //Valida a imagem apenas se estiver inserindo um novo cliente
    if (req.method == "POST" && !cliente.logo)
        return res.status(400).json({message: "Por favor, insira uma imagem"});
    else{
        req.body = cliente;
        next();        
    }
}
const excluir = async (req, res) => {
    let idCliente = req.headers["idcliente"] 
    try {
        var cliente = await Cliente.findOne({_id: idCliente});        
        await Cliente.findByIdAndDelete(idCliente);

        //Exclui o relacionamento com os users
        let users = await User.find({});
        users.forEach(async (user)=>{
            user.clientes.forEach((clienteLiberado, index)=>{
                if (clienteLiberado == cliente._id)
                    user.clientes.splice(index, 1);
            });
            await user.save();
        });
       //Exclui as imagens
        cliente.produtos.forEach(produto=>{
            try{fs.unlinkSync(PRODUTO_IMG_FOLDER + produto.imagem);}catch(error){}
        })
        cliente.filiados.forEach(filiado=>{
            try {fs.unlinkSync(FILIADO_IMG_FOLDER + filiado.logo);} catch (error) {}
        })
        try {        
            fs.unlinkSync(CLIENTE_LOGO_FOLDER + cliente.logo);
            fs.unlinkSync(CLIENTE_LOGO_FOLDER + cliente.imagemCampanha);
        } catch (error) {
            console.log(error);
        }
        return res.json({ message: "Cliente excluído com sucesso!" }); 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Houve um erro ao excluir o cliente" });
    }
    
    

}
const logo = async (req, res) => {
    try {
        let cliente = await Cliente.findOne({ nomeUrl: req.params.nomeUrl }).select("logo");
        res.contentType(cliente.logo.contentType);       
        return res.send(cliente.logo.data);
    } catch (error) {
        //res.status(500).send();
        res.send(error)
    }
    

}
const validarPrivilegioUsuario = async (req, res, next)=>{
    if ((req.method == "POST" || req.method == "DELETE") && req.user.privilegio == 2){
         return res.status(403).json({message: "O usuário não tem permissão para a ação"}); 
    }
    else if(req.method == "PUT" && req.user.privilegio == 2){        
         let clienteLiberado = req.user.clientes.filter(cliente=>{
             return cliente == req.headers.idcliente;
         })
         if (clienteLiberado.length == 0)
             return res.status(403).json({message: "O usuário não tem permissão para a ação"}); 
    }
    next();   
 }

 //REST API
 const selecionarTodos = (req, res) => {
    Cliente.find({}, (err, clientes)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message: "Houve um erro ao retornar os dados"})
        }      
        return res.json(clientes);  
    })
}
const selecionarClientePeloId = (req, res) =>{
    
}
module.exports = {
    selecionar,
    inserir,
    editar,
    excluir,
    logo,
    validarCliente,
    validarPrivilegioUsuario,

    //REST API
    selecionarTodos,
    selecionarClientePeloId
}