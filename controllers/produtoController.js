const Cliente = require("../models/Cliente");
const imgController = require("./imgController");
const path = require("path");
const PRODUTO_IMG_FOLDER = path.join(__dirname + "/../img/produtos/");
const fs = require("fs");


const selecionarTodos = (req, res)=>{
    let idCliente = req.headers["idcliente"]
    db.listarProdutosPorCliente(idCliente, produtos=>{
        res.send(JSON.stringify(produtos))
    })
}
const inserir = async (req, res)=>{
    
    try {
        let idCliente = req.headers.idcliente;

        let produto = { descricao: req.body.descricao, preco: req.body.preco, destaque: req.body.destaque };

        let cliente = await Cliente.findById(idCliente).select("produtos");

        const novoProduto = cliente.produtos.create(produto);

        let img = req.body.imagem;
        let imgPath = cliente._id + "-" + novoProduto._id + "." + img.contentType;
        imgController.salvarImg(img.data, PRODUTO_IMG_FOLDER, imgPath);

        novoProduto.imagem = imgPath;
        
        cliente.produtos.push(novoProduto);
        
        
        await cliente.save();
        return res.json({message: "Produto inserido com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Houve um erro ao cadastrar o produto"});
    }
}
const editar = async (req, res)=>{
    
    try {
        let idCliente = req.headers.idcliente;
        let idProduto = req.headers.idproduto;
        let produto = req.body;        

        if (produto.imagem){
            //Salva a imagem
            let imgPath = idCliente + "-" + idProduto + "." + produto.imagem.contentType;
            imgController.salvarImg(produto.imagem.data, PRODUTO_IMG_FOLDER, imgPath);

            //substitui a imagem pelo path
            produto.imagem = imgPath; 
        }             
        else{
            //Se não é enviada uma nova imagem, mantém a antiga;
            let cliente =  await Cliente.findOne({_id: idCliente}).select("produtos");
            cliente.produtos.forEach(prod=>{
                if (prod._id == idProduto)
                    produto.imagem = prod.imagem;
            });
        }
        let cliente = await Cliente.findOneAndUpdate({_id: idCliente, "produtos._id": idProduto },
         {
            "$set" :{
                "produtos.$": produto
            }
        }, {useFindAndModify: false});

        

        res.json({message: "O produto foi editado com sucesso!"});

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Houve um erro ao editar o produto"});
    }
}
const excluir = async (req, res)=>{
    let idCliente = req.headers.idcliente;
    let idProduto = req.headers.idproduto;

    try {
        let cliente = await Cliente.findOne({_id: idCliente}).select("produtos");
        cliente.produtos.forEach(produto=>{
            if (produto._id == idProduto){
                cliente.produtos.remove(produto);
                try{
                    fs.unlinkSync(PRODUTO_IMG_FOLDER + produto.imagem);
                }
                catch (error){
                    console.log(error);
                }
            }
        });      
        await cliente.save();        
        res.json({message: "O produto foi excluído com sucesso"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Houve um erro ao excluir o produto"});
    }
}
const validarProduto = async (req, res, next)=>{
    let produto = req.body;
    if (produto.descricao.length < 5 || produto.descricao.length > 100)
        return res.status(400).json({message: "Por favor, insira uma descrição que possua entre 5 e 100 caracteres"});
    else if (produto.preco < 0)
        return res.status(400).json({message: "O preço não pode ser negativo"});
    //valida a imagem apenas se estiver inserindo um novo produto
    else if (req.method == "POST" && !produto.imagem)    
        return res.status(400).json({message: "Por favor, insira uma imagem para o produto"});
    else
        next();   

}
const alterarOrdem = async (req, res)=>{
    let ordemProdutos = req.body;
    let produtosOrdenados = [];
    let idCliente = req.headers.idcliente;
    try {
        let cliente = await Cliente.findById(idCliente);
        //Atualiza a ordem dos produtos
        for (let i = 0; i < ordemProdutos.length; i++){
            for(let j = 0; j < cliente.produtos.length; j++){
                if (ordemProdutos[i] == cliente.produtos[j]._id){
                    produtosOrdenados[i] = cliente.produtos[j];
                }
            }
        }
        //Aplica a nova ordem
        cliente.produtos = produtosOrdenados;
        await cliente.save();
        return res.json({message: "Ordem editada com sucesso"});
    } catch (error) {
        return res.status(500).json({message: "Houve um erro ao editar a ordem dos produtos."});
    }
   
    
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
    selecionarTodos,
    inserir,
    editar,
    excluir,
    validarProduto,
    alterarOrdem,
    PRODUTO_IMG_FOLDER,
    validarPrivilegioUsuario
}