const clienteController = require("./clienteController");
const Cliente = require("../models/Cliente");
const User = require("../models/User");
const load = async (req, res) => {
    let clientes = await Cliente.find();
    let users = await User.find();
    return res.render("admin", { clientes, users, query: req.query, userLogado: req.user });
}
const login = async (req, res) => {
    let clientes = await Cliente.find();
    return res.render("login", { clientes });
}
const carregarClientes = (req, res, next) => {
    //Carrega todos os clientes
    Cliente.find({}, (err, clientes) => {
        if (err)
            console.log(err);
        req.clientes = clientes;

        //Filtra o cliente selecionado
        if (req.query.idCliente) {
            req.cliente = clientes.filter(cli => {
                return cli._id == req.query.idCliente;
            })[0];

            //Filtra o produto selecionado
            if (req.query.idProduto) {
                req.produto = req.cliente.produtos.filter(produto => {
                    return produto._id == req.query.idProduto;
                })[0];
            }

            //Filtra o filiado selecionado
            if (req.query.idFiliado) {
                req.filiado = req.cliente.filiados.filter(filiado => {
                    return filiado._id == req.query.idFiliado;
                })[0];
            }
            //Filtra o parceiro selecionado
            if (req.query.idParceiro) {
                req.parceiro = req.cliente.parceiros.filter(parc => {
                    return parc._id == req.query.idParceiro
                })[0];
            }
            //Filtra a campanha selecionada
            req.campanha = req.cliente.cuponsPromocionais.filter(camp => {
                return camp._id == req.query.idCampanha
            })[0];
        }
        next();
    })
}
const usuarios = (req, res) => {
    User.find({}, (err, users) => {
        if (err)
            console.log(err);
        return res.render("admin/usuarios", { clientes: req.clientes, userLogado: req.user, users });
    })
}
const novoUsuario = (req, res) => {
    return res.render("admin/novoUsuario", { clientes: req.clientes, userLogado: req.user });
}
const editarUsuario = (req, res) => {
    User.findById(req.query.idUsuario, (err, user) => {
        if (err)
            console.log(err);
        if (!user)
            return res.render("erro", { erro: "Usuário não encontrado" });
        return res.render("admin/editarUsuario", { clientes: req.clientes, userLogado: req.user, user });
    })
}
const editarClientesLiberados = (req, res) => {
    User.findById(req.query.idUsuario, (err, user) => {
        if (err)
            console.log(err);
        if (!user)
            return res.render("erro", { erro: "Usuário não encontrado" });
        return res.render("admin/editarClientesLiberados", { clientes: req.clientes, userLogado: req.user, user })
    })
}
const clientes = (req, res) => {
    return res.render("admin/clientes", { clientes: req.clientes, userLogado: req.user });
}
const novoCliente = (req, res) => {
    return res.render("admin/novoCliente", { clientes: req.clientes, userLogado: req.user })
}
const editarCliente = (req, res) => {
    return res.render("admin/editarCliente", { clientes: req.clientes, cliente: req.cliente, userLogado: req.user })
}
const novoProduto = (req, res) => {
    return res.render("admin/novoProduto", { clientes: req.clientes, cliente: req.cliente })
}
const editarProduto = (req, res) => {
    return res.render("admin/editarProduto", { clientes: req.clientes, cliente: req.cliente, produto: req.produto })
}
const novoFiliado = (req, res) => {
    return res.render("admin/novoFiliado", { clientes: req.clientes, cliente: req.cliente })
}
const editarFiliado = (req, res) => {
    return res.render("admin/editarFiliado", { clientes: req.clientes, cliente: req.cliente, filiado: req.filiado })
}
const novoParceiro = (req, res) => {
    return res.render("admin/novoParceiro", { clientes: req.clientes, cliente: req.cliente });
}
const editarParceiro = (req, res) => {
    return res.render("admin/editarParceiro", { clientes: req.clientes, cliente: req.cliente, parceiro: req.parceiro })
}
const cuponsPromocionais = (req, res) => {
    return res.render("admin/cupons", { clientes: req.clientes, cliente: req.cliente });
}
const novaCampanhaCupons = (req, res) => {
    return res.render("admin/novaCampanhaCupons", { clientes: req.clientes, cliente: req.cliente })
}

const editarCampanhaCuponsAtiva = (req, res) => {       
    return res.render("admin/editarCampanhaCuponsAtiva", { clientes: req.clientes, cliente: req.cliente, campanha: req.campanha })
}
const campanhaCuponsFinalizada = (req, res) => {
    return res.render("admin/campanhaCuponsFinalizada", { clientes: req.clientes, cliente: req.cliente, campanha: req.campanha })
}
const novaOpcaoPersonalizada = (req, res) => {
    return res.render("admin/novaOpcaoPersonalizada", { clientes: req.clientes, cliente: req.cliente, campanha: req.campanha })
}
const editarOpcaoPersonalizada = (req, res) => {
    let opcaoPersonalizada = req.campanha.opcoesPersonalizadas.filter(opcao => {
        return opcao._id.equals(req.query.idOpcao)
    })[0]
    return res.render("admin/editarOpcaoPersonalizada", {
        clientes: req.clientes,
        cliente: req.cliente,
        campanha: req.campanha,
        opcaoPersonalizada: opcaoPersonalizada
    })
}
module.exports = {
    load,
    login,
    carregarClientes,
    usuarios,
    novoUsuario,
    editarUsuario,
    editarClientesLiberados,
    clientes,
    novoCliente,
    editarCliente,
    novoProduto,
    editarProduto,
    novoFiliado,
    editarFiliado,
    novoParceiro,
    editarParceiro,
    cuponsPromocionais,
    novaCampanhaCupons,
    editarCampanhaCuponsAtiva,
    campanhaCuponsFinalizada,
    novaOpcaoPersonalizada,
    editarOpcaoPersonalizada
}