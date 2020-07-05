const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");
const auth = require("../controllers/authController");

router.get("/", produtoController.selecionarTodos);
router.post("/", auth.autenticacaoAPI, produtoController.validarPrivilegioUsuario, produtoController.validarProduto, produtoController.inserir);
router.put("/", auth.autenticacaoAPI, produtoController.validarPrivilegioUsuario, produtoController.validarProduto, produtoController.editar);
router.delete("/", auth.autenticacaoAPI, produtoController.validarPrivilegioUsuario, produtoController.excluir);

router.put("/ordem", produtoController.alterarOrdem);
module.exports = router;