const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../controllers/authController");

router.get("/login", userController.loginPage);
router.post("/login", userController.login);
router.post("/", auth.autenticacaoAPI, userController.validarPrivilegioUsuario, userController.validar, userController.inserir);
router.put("/", auth.autenticacaoAPI, userController.validarPrivilegioUsuario, userController.validar, userController.editar);
router.put("/clientesliberados", auth.autenticacaoAPI, userController.validarPrivilegioUsuario, userController.editarClientesLiberados);
router.delete("/", auth.autenticacaoAPI, userController.validarPrivilegioUsuario, userController.excluir);
module.exports = router;