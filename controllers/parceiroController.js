const Cliente = require("../models/Cliente");
const path = require("path");
const fs = require("fs");

const inserirParceiro = async (req, res)=>{
    let novoParceiro = req.body
    let {idCliente} = novoParceiro;
    delete novoParceiro.idCliente;

    if (!req.files)
        return res.render("erro", {erro: "Por favor insira uma imagem para o parceiro"});

    Cliente.findById(idCliente, (err, cliente)=>{
        if (err){
            console.log(err)
            return res.render("erro", {erro: "Erro interno ao inserir o parceiro"});
        }
        if (!cliente)
            return res.render("erro", {erro: "Cliente não encontrado"});

        let parceiro = cliente.parceiros.create(novoParceiro);

        let logo = `${idCliente}-${parceiro._id}.${req.files.logo.name.split(".").pop()}`;
        let parceirosPath = path.join(__dirname, `../img/parceiros/${logo}`);
        req.files.logo.mv(parceirosPath, err=>{
            if (err){
                console.log(err)
                return res.render("erro", {erro: "Erro interno ao inserir o parceiro"});
            }
            parceiro.logo = logo;
            cliente.parceiros.push(parceiro);
            cliente.save((err, cliente)=>{
            if (err || !cliente){
                console.log(err);
                return res.render("erro", {erro: "Erro interno ao inserir o parceiro"});
            }
            return res.redirect("/admin/editarcliente?idCliente=" + idCliente);
            });
        })


    })
}
const editarOuExcluirParceiro = (req, res)=>{
    let {idCliente} = req.body;
    let parceiro = req.body
    delete parceiro.idCliente;
    //Exclusao
    if (parceiro.action ==  "excluir"){
        Cliente.findOne({_id: idCliente}, (err, cliente)=>{
            logo = cliente.parceiros.id(parceiro._id).logo;
            fs.unlink(path.join(__dirname, "../img/parceiros/" + logo), ()=>{});
            cliente.parceiros.pull(parceiro._id);            
            cliente.save();
            return res.redirect("/admin/editarcliente?idCliente=" + idCliente);
        })
    }
    //Edição
    else{
        delete parceiro.action
        //Find para pegar a logo atual
        Cliente.findById(idCliente, (err, cliente)=>{
            if (err){
                console.log(err);
                return res.render("erro", {erro: "Erro interno ao atualizar o parceiro"});
            }
            if (!cliente){
                return res.render("erro", {erro: "Cliente não encontrado"})
            }

            //pega a logo atual
            parceiro.logo = cliente.parceiros.filter(par=>{
                return par._id == parceiro._id
            })[0].logo;
            //Salva a nova logo caso enviada
            if (req.files){
                parceiro.logo = `${idCliente}-${parceiro._id}.${req.files.logo.name.split(".").pop()}`;
                let parceirosPath = path.join(__dirname, `../img/parceiros/${parceiro.logo}`);
                req.files.logo.mv(parceirosPath, err=>{
                    if (err){
                        console.log(err)
                        return res.render("erro", {erro: "Erro interno ao atualizar o parceiro"});
                    }
                })
            }
            //Salva o parceiro
            Cliente.findOneAndUpdate({_id: idCliente, "parceiros._id": parceiro._id}, {
                "$set":{
                    "parceiros.$": parceiro
                }
            }, {useFindAndModify: false}, (err, cliente)=>{
                if (err){
                    console.log(err);
                    return res.render("erro", {erro: "Erro interno ao atualizar o parceiro"});
                }
                if (!cliente){
                    return res.render("erro", {erro: "Cliente não encontrado"})
                }
                return res.redirect("/admin/editarcliente?idCliente=" + idCliente);

            })
        })
        
    }
    

    
}

module.exports = {
    inserirParceiro,
    editarOuExcluirParceiro
}