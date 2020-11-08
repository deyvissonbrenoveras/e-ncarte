const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../controllers/authController");

router.get("/:nomeUrl", clienteController.selecionar);
router.get("/:nomeUrl/logo", clienteController.logo);
router.post("/", auth.autenticacaoAPI, clienteController.validarPrivilegioUsuario, clienteController.validarCliente, clienteController.inserir);
router.put("/", auth.autenticacaoAPI, clienteController.validarPrivilegioUsuario, clienteController.validarCliente, clienteController.editar);
router.delete("/", auth.autenticacaoAPI, clienteController.validarPrivilegioUsuario, clienteController.excluir);


//REST API
// router.get("/", clienteController.selecionarTodos);
// router.get("/porid/:id", clienteController.selecionarClientePeloId);
module.exports = router;