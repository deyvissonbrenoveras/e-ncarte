const Cliente = require('../models/Cliente');
const User = require('../models/User');

const load = async (req, res) => {
  const clientes = await Cliente.find();
  const users = await User.find();
  return res.render('admin', {
    clientes, users, query: req.query, userLogado: req.user,
  });
};
const login = async (req, res) => {
  const clientes = await Cliente.find();
  return res.render('login', { clientes, userLogado: req.user });
};
const carregarClientes = (req, res, next) => {
  // Carrega todos os clientes
  Cliente.find({}, (err, clientes) => {
    if (err) { console.log(err); }
    req.clientes = clientes;

    // Filtra o cliente selecionado
    if (req.query.idCliente) {
      req.cliente = clientes.filter((cli) => cli._id == req.query.idCliente)[0];

      // Filtra o produto selecionado
      if (req.query.idProduto) {
        req.produto = req.cliente.produtos.filter((produto) => produto._id == req.query.idProduto)[0];
      }

      // Filtra o filiado selecionado
      if (req.query.idFiliado) {
        req.filiado = req.cliente.filiados.filter((filiado) => filiado._id == req.query.idFiliado)[0];
      }
      // Filtra o parceiro selecionado
      if (req.query.idParceiro) {
        req.parceiro = req.cliente.parceiros.filter((parc) => parc._id == req.query.idParceiro)[0];
      }
      // Filtra a campanha selecionada
      req.campanha = req.cliente.cuponsPromocionais.filter((camp) => camp._id == req.query.idCampanha)[0];
    }
    next();
  });
};
const usuarios = (req, res) => {
  User.find({}, (err, users) => {
    if (err) { console.log(err); }
    return res.render('admin/usuarios', { clientes: req.clientes, userLogado: req.user, users });
  });
};
const novoUsuario = (req, res) => res.render('admin/novoUsuario', { clientes: req.clientes, userLogado: req.user });
const editarUsuario = (req, res) => {
  User.findById(req.query.idUsuario, (err, user) => {
    if (err) { console.log(err); }
    if (!user) { return res.render('erro', { erro: 'Usuário não encontrado' }); }
    return res.render('admin/editarUsuario', { clientes: req.clientes, userLogado: req.user, user });
  });
};
const editarClientesLiberados = (req, res) => {
  User.findById(req.query.idUsuario, (err, user) => {
    if (err) { console.log(err); }
    if (!user) { return res.render('erro', { erro: 'Usuário não encontrado' }); }
    return res.render('admin/editarClientesLiberados', { clientes: req.clientes, userLogado: req.user, user });
  });
};
const clientes = (req, res) => res.render('admin/clientes', { clientes: req.clientes, userLogado: req.user });
const novoCliente = (req, res) => res.render('admin/novoCliente', { clientes: req.clientes, userLogado: req.user });
const editarCliente = (req, res) => res.render('admin/editarCliente', { clientes: req.clientes, cliente: req.cliente, userLogado: req.user });
const novoProduto = (req, res) => res.render('admin/novoProduto', { clientes: req.clientes, cliente: req.cliente, userLogado: req.user });
const editarProduto = (req, res) => res.render('admin/editarProduto', {
  clientes: req.clientes, cliente: req.cliente, produto: req.produto, userLogado: req.user,
});
const novoFiliado = (req, res) => res.render('admin/novoFiliado', { clientes: req.clientes, cliente: req.cliente, userLogado: req.user });
const editarFiliado = (req, res) => res.render('admin/editarFiliado', {
  clientes: req.clientes, cliente: req.cliente, filiado: req.filiado, userLogado: req.user,
});
const novoParceiro = (req, res) => res.render('admin/novoParceiro', { clientes: req.clientes, cliente: req.cliente, userLogado: req.user });
const editarParceiro = (req, res) => res.render('admin/editarParceiro', {
  clientes: req.clientes, cliente: req.cliente, parceiro: req.parceiro, userLogado: req.user,
});
const cuponsPromocionais = (req, res) => res.render('admin/cupons', { clientes: req.clientes, cliente: req.cliente, userLogado: req.user });
const novaCampanhaCupons = (req, res) => res.render('admin/novaCampanhaCupons', { clientes: req.clientes, cliente: req.cliente, userLogado: req.user });

const editarCampanhaCuponsAtiva = (req, res) => res.render('admin/editarCampanhaCuponsAtiva', {
  clientes: req.clientes, cliente: req.cliente, campanha: req.campanha, userLogado: req.user,
});
const campanhaCuponsFinalizada = (req, res) => res.render('admin/campanhaCuponsFinalizada', {
  clientes: req.clientes, cliente: req.cliente, campanha: req.campanha, userLogado: req.user,
});
const novaOpcaoPersonalizada = (req, res) => res.render('admin/novaOpcaoPersonalizada', {
  clientes: req.clientes, cliente: req.cliente, campanha: req.campanha, userLogado: req.user,
});
const editarOpcaoPersonalizada = (req, res) => {
  const opcaoPersonalizada = req.campanha.opcoesPersonalizadas.filter((opcao) => opcao._id.equals(req.query.idOpcao))[0];
  return res.render('admin/editarOpcaoPersonalizada', {
    userLogado: req.user,
    clientes: req.clientes,
    cliente: req.cliente,
    campanha: req.campanha,
    opcaoPersonalizada,
  });
};
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
  editarOpcaoPersonalizada,
};
