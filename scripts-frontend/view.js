function changeActiveTab(elementToActive) {
    try {
        let adminTab = elementToActive.parentNode.parentNode    
        let tabs = adminTab.children
        for (let tab of tabs) {
            for (let navLink of tab.children) {
                if (navLink.id === elementToActive.id) {

                    navLink.className = "nav-link active"
                }
                else {
                    navLink.className = "nav-link"
                }

            }
    }
    } catch (error) {
        console.log(error)
    }
    

}
// var editarClienteHTML = 
// `<div class="col-12">
//     <form>
//         <div class="col-12">
//             <h1 id="cadastrarClienteh1">Cadastrar cliente</h1>
//         </div>
//         <div class="col-md-12">
//             <div class="form-group">
//                 <label>Nome</label>
//                 <input id="clienteNome" class="form-control" type="text" placeholder="Insira o nome do cliente">
//             </div>
//         </div>
//         <div class="col-md-12"> 
//             <div class="form-group">
//                 <label>Url</label>
//                 <input id="clienteNomeUrl" class="form-control" type="text" placeholder="Insira a URL">  
//             </div>
//         </div>
//         <div class="col-md-12 mt-3">
//             <div class="form-group">
//                 <label>Logo</label>
//                 <input id="clienteLogo" class="form-control-file" type="file" onchange="loadLogo()">
//                 <button id="excluirCliente "onclick="excluirCliente()" class="btn btn-danger mt-5 mr-2">Excluír</button>
//                 <button id="salvarCliente" onclick="inserirCliente()" class="btn btn-warning mt-5">Salvar</button>
//             </div>
//         </div>
//     </form>
//  </div>`
//  var novoClienteHTML = 
// `<div class="col-12">
//     <form>
//         <div class="col-12">
//             <h3 id="cadastrarClienteh1">Cadastrar cliente</h3>
//         </div>
//         <div class="col-md-6">
//             <div class="form-group">
//                 <label>Nome</label>
//                 <input id="clienteNome" class="form-control" type="text" placeholder="Insira o nome do cliente">
//             </div>
//         </div>
//         <div class="col-md-6"> 
//             <div class="form-group">
//                 <label>Url</label>
//                 <input id="clienteNomeUrl" class="form-control" type="text" placeholder="Insira a URL">  
//             </div>
//         </div>
//         <div class="col-md-6 mt-3">
//             <div class="form-group">
//                 <label>Logo</label>
//                 <input id="clienteLogo" class="form-control-file" type="file" onchange="loadLogo()">
//                 <div class="mt-5 text-center">
//                     <button id="salvarCliente" onclick="inserirCliente()" class="btn btn-warning w-50">Salvar</button>
//                 </div>
//             </div>
//         </div>
//     </form>
//  </div>`
 var usuariosHTML = 
`<div class="col-12">
    <div class="col-12">
        <h3>Usuários</h3>
    </div>
    <div class="col-6 p-3">
        <h4>Cadastrar</h4>
        <div class="input-group mt-3">
            <input id="userName" type="text" placeholder="Nome" class="form-control">
        </div>
        <div class="input-group mt-3">
            <div class="input-group-pretend">
                <span class="input-group-text">@</span>
            </div>
            <input id="userEmail"type="text" placeholder="E-mail" class="form-control">
        </div>
        <div class="input-group mt-3">
            <input id="userPassword" type="password" placeholder="Senha" class="form-control">
        </div>
        <div class="mt-3 text-center">
            <button class="btn btn-warning w-50" onclick="registrarUsuario()">Salvar</button>
        </div>
    </div>
</div>`;
// var clientes
// async function tabAdminClienteClick(element) {
//     var areaTabAdmin = document.getElementById("areaTabAdmin")
//     let listarClientesHTMLData = ""
//     changeActiveTab(element)
//     if (element.id == "clientesCadastrados") {
//         areaTabAdmin.innerHTML = "Carregando clientes..."
//         listarClientes(listClientes => {
//         //     try {
//         //         clientes = listClientes
//         //         listClientes.forEach((cliente, index) => {
//         //             listarClientesHTMLData += 
//         //             `<tr class="cliente-row" onclick="viewEditarCliente(this.id)" id="${cliente._id}">
//         //                 <th scope="row">${index}</th>
//         //                 <td>${cliente.nome}</td>
//         //                 <td>${cliente.nomeUrl}</td>
//         //                 <td><img src="${cliente.logo}" class="img-logo-admin"></td>
//         //             </tr>\r\n`
//         //         })
//         //         let listarClientesHTML = 
//         //         `<table class="table mt-5">
//         //             <thead>
//         //                 <tr>
//         //                     <th scope="col">#</th>
//         //                     <th scope="col">Nome</th>
//         //                     <th scope="col">URL</th>
//         //                     <th scope="col">Logo</th>
//         //                 </tr>
//         //             </thead>
//         //             <tbody>
//         //                 ${listarClientesHTMLData}
//         //             </tbody>
//         //         </table>`            
//         //         areaTabAdmin.innerHTML = listarClientesHTML
//         //     } catch (error) {
//         //         console.log(error)
//         //     }
//         // })

//     }
//     // else if (element.id == "novoCliente") {
//     //     areaTabAdmin.innerHTML = novoClienteHTML
//     //     console.log(document.getElementById("excluirCliente"))
//     // }
//     // else if (element.id == "usuarios"){
//     //     // areaTabAdmin.innerHTML = usuariosHTML;
//     // }
// }
function tabAdminProdutosClick(element){
    var tabAdminProdutos = document.getElementById("produtosTab")
    changeActiveTab(element)
    if (element.id == "produtosCadastrados"){
        tabAdminProdutos.innerHTML += "<p id='carregandoProdutos'>Carregando produtos...</p>"
        listarProdutos(produtos=>{
            let listarProdutosTabela =
            `<table class="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Logo</th>
                    </tr>
                </thead>
                <tbody id="produtosCadastradosBody">
                </tbody>
            </table>`
            document.getElementById("areaProdutos").innerHTML = listarProdutosTabela
            try {
                let listarProdutosHTMLData = "" 
                produtos.forEach((produto, index)=>{
                    listarProdutosHTMLData +=
                    `<tr">
                        <th scope="row">${index}</th>
                        <td>${produto.descricao}</td>
                        <td>${produto.preco}</td>
                        <td><img src="${produto.imagemPath}" class="img-logo-admin"></td>
                    </tr>\r\n`             
                })
                tabAdminProdutos.removeChild(document.getElementById("carregandoProdutos"))                
                document.getElementById("produtosCadastradosBody").innerHTML = listarProdutosHTMLData
            } catch (error) {
                console.log(error)
            }
            
        })
    }
    else if (element.id == "novoProduto"){
        let novoProdutoHTML =
        `<div class="col-12">
            <form>
                <div class="col-12">
                    <h1>Cadastrar Produto</h1>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Descrição</label>
                        <input id="produtoDescricao" class="form-control" type="text" placeholder="Insira a descrição do produto">
                    </div>
                </div>
                <div class="col-md-12"> 
                    <div class="form-group">
                        <label>Preço</label>
                        <input id="produtoPreco" class="form-control" type="text" placeholder="Insira o preço do produto">  
                    </div>
                </div>
                <div class="col-md-12 mt-3">
                    <div class="form-group">
                        <label>Imagem</label>
                        <input id="produtoImagem" class="form-control" type="text" placeholder="Insira a URL da imagem">
                        <button id="salvarProduto" onclick="inserirProduto()" class="btn btn-warning mt-5">Salvar</button>
                    </div>
                </div>
            </form>
        </div>`
        document.getElementById("areaProdutos").innerHTML = novoProdutoHTML
    }
}
// var idEditarCliente = ""
// function viewEditarCliente(clienteId){
//     idEditarCliente = clienteId
//     let cliente = clientes.filter(cli=>{
//         return cli._id == clienteId
//     })
//     var clientesCadastrados = document.getElementById('clientesCadastrados');
//     areaTabAdmin.innerHTML = `<div class="col-12">
//     <h5><a href="#" onclick='tabAdminClienteClick(clientesCadastrados)'>Voltar</a></h5>
//     </div>`
//     areaTabAdmin.innerHTML += editarClienteHTML
//     let listarProdutosHTML = 
//     `<div class="col-12">
//         <ul id="produtosTab" class="nav nav-tabs">
//             <li class="nav-item">
//                 <a id="produtosCadastrados" onclick="tabAdminProdutosClick(this)" class="nav-link active">Produtos cadastrados</a>
//             </li>
//             <li class="nav-item">
//                 <a id="novoProduto" onclick="tabAdminProdutosClick(this)" class="nav-link">Novo Produto</a>
//             </li>
//         </ul>
//         <div id="areaProdutos" class="col-12">
//         </div>
//     </div>`    
//     areaTabAdmin.innerHTML += listarProdutosHTML
//     document.getElementById("cadastrarClienteh1").innerHTML = "Editar cliente"
//     document.getElementById("salvarCliente").onclick = editarCliente
//     document.getElementById("clienteNome").value = cliente[0].nome
//     document.getElementById("clienteNomeUrl").value = cliente[0].nomeUrl
//     document.getElementById("clienteLogo").value = cliente[0].logoPath
//     tabAdminProdutosClick(document.getElementById("produtosCadastrados"))
     
// }
//modal produtos


