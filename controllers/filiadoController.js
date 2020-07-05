const Cliente = require("../models/Cliente");
const imgController = require("./imgController");
const path = require("path");
const FILIADO_IMG_FOLDER = path.join(__dirname, "/../public/img/filiados/");
const fs = require("fs");

const inserir = async (req, res)=>{
    
    try {
        let idCliente = req.headers.idcliente;
        let filiado = { nome: req.body.nome, endereco: req.body.endereco, telefone: req.body.telefone};
        let cliente = await Cliente.findById(idCliente).select("filiados");

        const novoFiliado = cliente.filiados.create(filiado);

        let logo = req.body.logo;
        let logoPath = `${cliente._id}-${novoFiliado._id}.${logo.contentType}`;
        imgController.salvarImg(logo.data, FILIADO_IMG_FOLDER, logoPath);

        novoFiliado.logo = logoPath;
        cliente.filiados.push(novoFiliado);
        await cliente.save();
        return res.json({message: "Filiado cadastrado com sucesso!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Houve um erro ao cadastrar o filiado"});
    }
}
const editar = async (req, res) =>{
    try {
        let idCliente = req.headers.idcliente;
        let idFiliado = req.headers.idfiliado;
        let filiado = req.body;

        if (filiado.logo){
            //Salva a imagem
            let logoPath = idCliente + "-" + idFiliado + "." + filiado.logo.contentType;
            imgController.salvarImg(filiado.logo.data, FILIADO_IMG_FOLDER, logoPath);

            //substitui a imagem pelo path
            filiado.logo = logoPath; 
        }
        else{
             //Se não é enviada uma nova imagem, mantém a antiga;
             let cliente =  await Cliente.findOne({_id: idCliente}).select("filiados");
             cliente.filiados.forEach(fili=>{
                 if (fili._id == idFiliado)
                    filiado.logo = fili.logo;
             });
        }

        let cliente = await Cliente.findOneAndUpdate({_id: idCliente, "filiados._id": idFiliado },
        {
           "$set" :{
               "filiados.$": filiado
           }
       }, {useFindAndModify: false});

       

       res.json({message: "O filiado foi editado com sucesso!"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Houve um erro ao editar o filiado"});
    }
}

const excluir = async (req, res) =>{
    let idCliente = req.headers.idcliente;
    let idFiliado = req.headers.idfiliado;

    try {
        let cliente = await Cliente.findOne({_id: idCliente}).select("filiados");
        cliente.filiados.forEach(filiado=>{
            if (filiado._id == idFiliado){
                cliente.filiados.remove(filiado);
                try{
                    fs.unlinkSync(FILIADO_IMG_FOLDER + filiado.logo);
                }
                catch (error){
                    console.log(error);
                }
            }
        });      
        await cliente.save();        
        res.json({message: "O filiado foi excluído com sucesso"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Houve um erro ao excluir o filiado"});
    }
}
const alterarOrdem = async (req, res)=>{
    let ordemFiliados = req.body;
    let filiadosOrdenados = [];
    let idCliente = req.headers.idcliente;
    try {
        let cliente = await Cliente.findById(idCliente);
        //Atualiza a ordem dos filiados
        for (let i = 0; i < ordemFiliados.length; i++){
            for(let j = 0; j < cliente.filiados.length; j++){
                if (ordemFiliados[i] == cliente.filiados[j]._id){
                    filiadosOrdenados[i] = cliente.filiados[j];
                }
            }
        }
        //Aplica a nova ordem
        cliente.filiados = filiadosOrdenados;
        await cliente.save();
        return res.json({message: "Ordem editada com sucesso"});
    } catch (error) {
        return res.status(500).json({message: "Houve um erro ao editar a ordem dos filiados."});
    }
}
const validarFiliado = (req, res, next)=>{
    let filiado = req.body;

    if(filiado.nome.length < 5 || filiado.nome.length > 100)
        return res.status(400).json({message: "Por favor, insira uma nome que possua entre 5 e 100 caracteres"});
     //valida a imagem apenas se estiver inserindo um novo filiado
     else if (req.method == "POST" && !filiado.logo)    
        return res.status(400).json({message: "Por favor, insira uma logo para o filiado"});
    else
        next(); 
}
const validarPrivilegioUsuario = async (req, res, next)=>{
    if (req.user.privilegio < 2){
        next();
    }
    else{
        let idCliente = req.headers.idcliente;
        let clienteLiberado = req.user.clientes.filter(cliente=>{
            return cliente == idCliente
        })
        if (clienteLiberado.length == 0)
            return res.status(403).json({message: "O usuário não tem permissão para a ação"}); 
        next();
    }
    
 }
module.exports = {
    inserir,
    editar,
    excluir,
    alterarOrdem,
    validarFiliado,
    FILIADO_IMG_FOLDER,
    validarPrivilegioUsuario
}