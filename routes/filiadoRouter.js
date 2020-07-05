const express = require("express");
const router = express.Router();
const filiadoController = require("../controllers/filiadoController.js");
const auth = require("../controllers/authController");

router.post("/", auth.autenticacaoAPI, filiadoController.validarPrivilegioUsuario, filiadoController.validarFiliado, filiadoController.inserir);
router.put("/", auth.autenticacaoAPI, filiadoController.validarPrivilegioUsuario, filiadoController.validarFiliado, filiadoController.editar);
router.delete("/", auth.autenticacaoAPI, filiadoController.validarPrivilegioUsuario, filiadoController.excluir);

router.put("/ordem", auth.autenticacaoAPI, filiadoController.validarPrivilegioUsuario, filiadoController.alterarOrdem);
module.exports = router;