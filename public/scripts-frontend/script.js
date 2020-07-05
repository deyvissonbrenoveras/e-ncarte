const url = document.location.origin;
//Classes
function Cliente(nome, nomeUrl, endereco, cidade, contato, whatsapp, logo, imagemCampanha, produtos){
    this.nome = nome;
    this.nomeUrl = nomeUrl;
    this.endereco = endereco;
    this.cidade = cidade;
    this.contato = contato;
    this.whatsapp = whatsapp;
    this.logo = logo;
    this.imagemCampanha = imagemCampanha;
    this.produtos = produtos;
}
function Produto(descricao, preco, imagem, destaque){
    this.descricao = descricao
    this.preco = preco
    this.imagem = imagem;
    this.destaque = destaque;
}
function Filiado(nome, endereco, telefone, logo){
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.logo = logo;
}
function User(name, email, password, privilegio){
    this.name = name;
    this.email = email;
    this.password = password;
    this.privilegio = privilegio;
}
function CuponsPromocionais(nome, chamada, periodoInicio, periodoFim, quantidadeCupons){
    this.nome = nome;
    this.chamada = chamada;
    this.periodoInicio = periodoInicio;
    this.periodoFim = periodoFim;
    this.quantidadeCupons = quantidadeCupons;
}
class Parceiro{
    constructor(nome, logo){
        this.nome = nome;
        this.logo = logo;
    }
}
//Logo cliente
var clienteLogo;
function loadClienteLogo(element){
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = e=>{
        let data = window.btoa(e.target.result);
        clienteLogo = {data, contentType: element.files[0].type.split("/")[1]};  
    }
}
//Imagem Campanha
var imagemCampanha;
function loadImagemCampanha(element){
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = e=>{
        let data = window.btoa(e.target.result);
        imagemCampanha = {data, contentType: element.files[0].type.split("/")[1]};    
    }
}
//Imagem Produto
var imagemProduto;
function loadImagemProduto(element){
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = e=>{
        let data = window.btoa(e.target.result);
        imagemProduto = {data, contentType: element.files[0].type.split("/")[1]};   
    }
}
//Logo filiado
var filiadoLogo;
function loadFiliadoLogo(element){
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = e=>{
        let data = window.btoa(e.target.result);
        filiadoLogo = {data, contentType: element.files[0].type.split("/")[1]};   
    }
}
//Logo Parceiro
var parceiroLogo;
function loadParceiroLogo(element){
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = e=>{
        let data = window.btoa(e.target.result);
        parceiroLogo = {data, contentType: element.files[0].type.split("/")[1]};
    }
}
//View
function preencherCliente(){
    let nome = document.getElementById("clienteNome").value
    let nomeUrl = document.getElementById("clienteNomeUrl").value    
    let whatsapp = document.getElementById("clienteWhatsapp").value 
    let endereco = document.getElementById("clienteEndereco").value 
    let cidade = document.getElementById("clienteCidade").value 
    let contato= document.getElementById("clienteContato").value 
    return new Cliente(nome, nomeUrl, endereco, cidade, contato, whatsapp, clienteLogo, imagemCampanha);
}
function preencherProduto(){
    let descricao = $("#produtoDescricao").val();
    let preco = $("#produtoPreco").val();
    let destaque = $("#produtoDestaque").prop("checked");
    return new Produto(descricao, preco, imagemProduto, destaque)
}
function preencherFiliado(){
    let nome = $("#filiadoNome").val();
    let endereco = $("#filiadoEndereco").val();
    let telefone = $("#filiadoTelefone").val();
    return new Filiado(nome, endereco, telefone, filiadoLogo);
}
function preencherUser(){
    let name = $("#userName").val();
    let email = $("#userEmail").val();
    let password = $("#userPassword").val();
    let privilegio = $("#privilegio").children("option:selected").val();
    return new User(name, email, password, privilegio);
}
function preencherCuponsPromocionais(){
    let nome = $("#cuponsPromocionaisNome").val();
    let chamada = $("#cuponsPromocionaisChamada").val();
    let periodoInicio = toDate($("#cuponsPromocionaisPeriodoInicio").val());
    let periodoFim = toDate($("#cuponsPromocionaisPeriodoFim").val());
    let quantidadeCupons = $("#cuponsPromocionaisQuantidade").val();
    return new CuponsPromocionais(nome, chamada, periodoInicio, periodoFim, quantidadeCupons);
}
function preencherParceiro(){
    let nome = $("#parceiroNome").val();
    return new Parceiro(nome, parceiroLogo);
}
function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
//FUNÇÕES CLIENTE INÍCIO
function inserirCliente(){
    let clienteNovo =  preencherCliente()
    let options = {
        method: "POST",
        credentials: 'same-origin',
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(clienteNovo)
    }
    fetch("/cliente", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200){
                window.location.href = "/admin/clientes";
            }
        });
        
    })
}
function listarClientes(callback){
    fetch("/cliente").then(res=>{
        res.json().then(clientes=>{
            callback(clientes)
        })
    })
}
function editarCliente(){
    let cliente = preencherCliente()
    let idCliente = $("#idCliente").val();
    let options ={
        method: "PUT",        
        credentials: 'same-origin',
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente}),
        body: JSON.stringify(cliente)
    }
    fetch("/cliente", options).then(res=>{
        res.json().then(json=>{
             alert(json.message)
              if (res.status == 200){
                 window.location.href = "/admin/editarcliente?idCliente=" + idCliente;
             }
        })
    })
}
function excluirCliente(){
    let cliente = preencherCliente()
    let idCliente = $("#idCliente").val();
    let confirmado = confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)
    if (confirmado){
        let options = {
            method: "DELETE",
            credentials: 'same-origin',
            headers: new Headers({"idcliente": idCliente})
        }
        fetch("/cliente", options).then(res=>{
            res.json().then(json=>{
                alert(json.message)
                if (res.status == 200){
                    window.location.href = "/admin/clientes"
                }                
            })
        })
    }   
}
//FUNÇÕES CLIENTE FIM

//FUNÇÕES PRODUTO INÍCIO
function listarProdutos(callback){
    let options = {
        method: "GET",
        headers: new Headers({"idcliente": idEditarCliente})
    }
    fetch("/produto", options).then(res=>{
         res.json().then(produtos=>{
            callback(produtos)
         })
    })
}
function inserirProduto(){
    let idCliente = $("#idCliente").val();
    let produtoNovo = preencherProduto()
    let options = {
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente}),
        body: JSON.stringify(produtoNovo)
    };
    fetch("/produto", options).then(res=>{
        res.json().then(json=>{
            alert(json.message)
            if (res.status == 200){
                location.reload();
            }
        });
    });
}
function editarProduto(){
    let idCliente = $("#idCliente").val();
    let idProduto = $("#idProduto").val();
    let produtoEditar = preencherProduto();
    let options = {
        method: "PUT",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente, "idproduto": idProduto}),
        body: JSON.stringify(produtoEditar)
    };
    fetch("/produto", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200){
                window.location.href = window.location.href = "/admin/editarcliente?idCliente=" + idCliente;
            }
        });
    });
}
function excluirProduto(){
    let confirmacao = confirm("Deseja excluir o produto?");
    if (confirmacao){
        let idCliente = $("#idCliente").val();
        let idProduto = $("#idProduto").val();

        let options = {
            method: "DELETE",
            credentials: "same-origin",
            headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente, "idproduto": idProduto})
        };
        fetch("/produto", options).then(res=>{
            res.json().then(json=>{
                alert(json.message);
                if (res.status == 200)
                    window.location.href = window.location.href = "/admin/editarcliente?idCliente=" + idCliente;
            });
        });
        }
    
}
let ordemProdutosAtual;
function alterarOrdemProdutos(alterar){
    if (alterar){
        cancelarAlterarOrdemFiliados();
        ordemProdutosAtual = $("#produtosBody").clone();
        $("#buttonNovoProduto").hide();
        $("#buttonAlterarOrdemProdutos").hide();
        $("#buttonCancelarAlterarOrdemProdutos").removeClass("d-none");
        $("#buttonSalvarOrdemProdutos").removeClass("d-none");
        $("#produtosBody").sortable().disableSelection();
        $("#produtosBody").sortable("enable");
        $("#produtosBody").children().addClass("cursor-move");
    }
    else{
        $("#buttonNovoProduto").show();
        $("#buttonAlterarOrdemProdutos").show();
        $("#buttonCancelarAlterarOrdemProdutos").addClass("d-none");
        $("#buttonSalvarOrdemProdutos").addClass("d-none");
        // $("#produtosBody").sortable("disable").enableSelection();
        $("#produtosBody").children().removeClass("cursor-move");
    }
}
function cancelarAlterarOrdemProdutos(){
    if (ordemProdutosAtual)
        $("#produtosBody").replaceWith(ordemProdutosAtual);
    addProdutosClickEvent();
    alterarOrdemProdutos(false);
}
function salvarOrdemProdutos(){
    let idCliente = $("#idCliente").val();
    let produtosTable = $("#produtosBody").children();
    let ordemProdutos = [];
    for (let i = 0; i < produtosTable.length; i++){
        ordemProdutos.push($(produtosTable[i]).attr("id"));
    }
    options ={
        method: "PUT",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente}),
        body: JSON.stringify(ordemProdutos)
    }
    fetch("/produto/ordem", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200)
                alterarOrdemProdutos(false);
        })
    })
}
//FUNÇÕES PRODUTO FIM

//FUNÇÕES FILIADO INÍCIO

function inserirFiliado(){
    let filiado = preencherFiliado();
    let idCliente = $("#idCliente").val();
    let options = {
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente}),
        body: JSON.stringify(filiado)
    };
    fetch("/filiado", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200){
                location.reload();
            }
        })
        
    });
}
function editarFiliado(){
    let idCliente = $("#idCliente").val();
    let idFiliado = $("#idFiliado").val();
    let filiadoEditar = preencherFiliado();
    let options = {
        method: "PUT",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente, "idfiliado": idFiliado}),
        body: JSON.stringify(filiadoEditar)
    };
    fetch("/filiado", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200){
                window.location.href = window.location.href = "/admin/editarcliente?idCliente=" + idCliente;
            }
        });
    });
}

function excluirFiliado(){
    let confirmacao = confirm("Deseja excluir o filiado?");
    if (confirmacao){
        let idCliente = $("#idCliente").val();
        let idFiliado = $("#idFiliado").val();

        let options = {
            method: "DELETE",
            credentials: "same-origin",
            headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente, "idfiliado": idFiliado})
        };
        fetch("/filiado", options).then(res=>{
            res.json().then(json=>{
                alert(json.message);
                if (res.status == 200)
                    window.location.href = window.location.href = "/admin/editarcliente?idCliente=" + idCliente;
            });
        });
        }
}
let ordemFiliadosAtual;
function alterarOrdemFiliados(alterar){
    if (alterar){
        cancelarAlterarOrdemProdutos();
        ordemFiliadosAtual = $("#filiadosBody").clone();
        $("#buttonNovoFiliado").hide();
        $("#buttonAlterarOrdemFiliados").hide();
        $("#buttonCancelarAlterarOrdemFiliados").removeClass("d-none");
        $("#buttonSalvarOrdemFiliados").removeClass("d-none");
        $("#filiadosBody").sortable().disableSelection();
        $("#filiadosBody").sortable("enable");
        $("#filiadosBody").children().addClass("cursor-move");
    }
    else{
        $("#buttonNovoFiliado").show();
        $("#buttonAlterarOrdemFiliados").show();
        $("#buttonCancelarAlterarOrdemFiliados").addClass("d-none");
        $("#buttonSalvarOrdemFiliados").addClass("d-none");
        $("#filiadosBody").children().removeClass("cursor-move");
    }
}
function cancelarAlterarOrdemFiliados(){
    if (ordemFiliadosAtual)
        $("#filiadosBody").replaceWith(ordemFiliadosAtual);
    addFiliadosClickEvent();
    alterarOrdemFiliados(false);
}
function salvarOrdemFiliados(){
    let idCliente = $("#idCliente").val();
    let filiadosTable = $("#filiadosBody").children();
    let ordemFiliados = [];
    for (let i = 0; i < filiadosTable.length; i++){
        ordemFiliados.push($(filiadosTable[i]).attr("id"));
    }
    options ={
        method: "PUT",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente}),
        body: JSON.stringify(ordemFiliados)
    }
    fetch("/filiado/ordem", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200)
                alterarOrdemFiliados(false);
        })
    })
}
//FUNÇÕES FILIADO FIM

//FUNÇÕES USUÁRIO INÍCIO
function registrarUsuario(){
    let user = preencherUser();
    let options = {
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(user)
    }
    fetch("/user", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if(res.status == 200){
                window.location.href = "/admin/usuarios";
            }
        })
    })
}
function login(){
    let loginUser = preencherUser();
    options = {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(loginUser)
    }
    fetch("/user/login", options).then(res=>{
        if (res.status == 200){
            let token = res.headers.get("authorization-token");
            // document.cookie = `authorization-token=${token};path=/admin`;
            document.cookie = `authorization-token=${token};`;
            document.location.href = document.location.origin + "/admin";
        }
        else{
            res.json().then(json=>{
                alert(json.message);
            })
        }       
    })
}

function editarUsuario(){
    let user = preencherUser();
    let idUsuario = $("#idUsuario").val();
    options = {
        method: "PUT",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idusuario": idUsuario}),
        body: JSON.stringify(user)
    }
    fetch("/user", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200)
                window.location.href = "/admin/usuarios";
        })
    })
}
function editarClientesLiberados(){
    let idUsuario = $("#idUsuario").val();
    let clientesLiberados = [];
    let clientesLiberadosTable = $("#clientesLiberadosBody").children();
    for (let i = 0; i < clientesLiberadosTable.length; i++){
        if($(clientesLiberadosTable[i]).find("input[type='checkbox']").prop("checked")){
            clientesLiberados.push($(clientesLiberadosTable[i]).attr("id"));
        }
    } 
    options = {
        method: "PUT",
        credentials: "same-origin",
        headers: new Headers({"Content-Type": "application/json", "idusuario": idUsuario}),
        body: JSON.stringify(clientesLiberados)
    }
    fetch("/user/clientesliberados", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200)
                window.location.href = "/admin/editarusuario?idUsuario=" + idUsuario;
        })
    })
}
function excluirUsuario(){
    let confirmacao = confirm("Deseja excluir o usuário?");
    if (confirmacao){
        let idUsuario = $("#idUsuario").val();
        options = {
            method: "DELETE",
            credentials: "same-origin",
            headers: new Headers({"Content-Type": "application/json", "idusuario": idUsuario})
        }
        fetch("/user", options).then(res=>{
            res.json().then(json=>{
                alert(json.message);
                if (res.status == 200)
                    window.location.href = "/admin/usuarios";
            });
        })
    }
    
}
//FUNÇÕES USUÁRIO FIM

//FUNCÕES CUPONS INÍCIO

function inserirCampanhaCupons(){
    let confirmacao = confirm("Ao criar uma nova campanha, a última campanha será encerrada automaticamente. Deseja continuar?");
    if (confirmacao){
        let cuponsPromocionais = preencherCuponsPromocionais();
        let idCliente = $("#idCliente").val();
        console.log(cuponsPromocionais)
        options = {
            method: "POST",
            headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente}),
            body: JSON.stringify(cuponsPromocionais)
        }
        fetch("/cupons", options).then(res=>{
            res.json().then(json=>{
                alert(json.message);
                if (res.status == 200){
                    window.location.href = "/admin/cuponspromocionais?idCliente=" + idCliente;
                }
            })
        })
    }
    
}
function editarCampanhaCupons(){
    let idCliente = $("#idCliente").val();
    let idCampanha = $("#idCampanha").val();
    let cupons = preencherCuponsPromocionais();
    options = {
        method: "PUT",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente, "idcampanha": idCampanha}),
        body: JSON.stringify(cupons)
    }
    fetch("/cupons", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200)
            window.location.href = "/admin/cuponspromocionais?idCliente=" + idCliente;
        })
    })
}
function inserirParticipante(){
    let participante = {
        nome: $("#participanteNome").val(),
        email: $("#participanteEmail").val(),
        codigo: $("#participanteCodigo").val(),
        opcaoPersonalizada: $("#opcaoPersonalizada").children("option:selected").val()
    }
    console.log(participante)
    let idCliente = $("#idCliente").val();
    let idCampanha = $("#idCampanha").val();
    options = {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json", "idcliente": idCliente, "idcampanha": idCampanha}),
        body: JSON.stringify(participante)
    }
    fetch("/cupons/participante", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            if (res.status == 200){
                $("#participanteNome").val("");
                $("#participanteEmail").val("");
                $("#participanteCodigo").val("");
                $("#modalPromocao").modal("hide");
            }
        })
    })    
}
function resgatarCupom(idParticipante){
    let idCliente = $("#idCliente").val();
    let idCampanha = $("#idCampanha").val();
    options = {
        method: "POST",
        headers: new Headers({
                "Content-Type": "application/json",
                "idcliente": idCliente,
                "idcampanha": idCampanha,
                "idparticipante": idParticipante
            })
    }
    fetch("/cupons/resgatarcupom", options).then(res=>{
        res.json().then(json=>{
            alert(json.message);
            console.log(res.status);
            if (res.status == 200){
                window.location.reload();
            }
            else if (res.status == 201){
                window.location.href = "/admin/cuponspromocionais?idCliente=" + idCliente;
            }
        })
    })

}
function encerrarCampanhaCupons(){
    let confirmacao = confirm("Após o encerramento da campanha nenhuma alteração poderá ser realizada, deseja continuar?");
    if (confirmacao){
        let idCliente = $("#idCliente").val();
        let idCampanha = $("#idCampanha").val();
        options = {
            method: "POST",
            headers: new Headers({
                    "Content-Type": "application/json",
                    "idcliente": idCliente,
                    "idcampanha": idCampanha,
                })
        }
        fetch("/cupons/encerrar", options).then(res=>{
            res.json().then(json=>{
                alert(json.message);
                if (res.status == 200){
                    window.location.href = "/admin/cuponspromocionais?idCliente=" + idCliente;
                }
            })
        })
    }    
}

//FUNÇÕES CUPONS FIM

//FUNÇÕES PARCEIROS INÍCIO
// function inserirParceiro(){
//     let idCliente = $("#idCliente").val();
//     let parceiro = preencherParceiro();
    
//     console.log(parceiro)
//     options = {
//         method: "POST",
//         body: JSON.stringify(parceiro)
//     }
//     fetch("/parceiro", options).then(res=>{
//         res.json().then(json=>{
//             alert(json.message);
//         })
//     })
// }
//FUNÇÕES PARCEIROS FIM
