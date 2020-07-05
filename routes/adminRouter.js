const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.use(adminController.carregarClientes);

router.get("/", adminController.clientes);
router.get("/login", adminController.login);
router.get("/usuarios", adminController.usuarios);
router.get("/novousuario", adminController.novoUsuario);
router.get("/editarusuario", adminController.editarUsuario);
router.get("/editarclientesliberados", adminController.editarClientesLiberados);
router.get("/clientes", adminController.clientes);
router.get("/novocliente", adminController.novoCliente);
router.get("/editarcliente", adminController.editarCliente);
router.get("/novoproduto", adminController.novoProduto);
router.get("/editarproduto", adminController.editarProduto)
router.get("/novofiliado", adminController.novoFiliado);
router.get("/editarfiliado", adminController.editarFiliado);
router.get("/novoparceiro", adminController.novoParceiro);
router.get("/editarparceiro", adminController.editarParceiro);
router.get("/cuponspromocionais", adminController.cuponsPromocionais);
router.get("/novacampanhacupons", adminController.novaCampanhaCupons);
router.get("/editarcampanhacuponsativa", adminController.editarCampanhaCuponsAtiva);
router.get("/campanhacuponsfinalizada", adminController.campanhaCuponsFinalizada);
router.get("/novaopcaopersonalizada", adminController.novaOpcaoPersonalizada);
router.get("/editaropcaopersonalizada", adminController.editarOpcaoPersonalizada)
module.exports = router;