const express = require("express");
const router = express.Router();
const cuponsPromocionaisController = require("../controllers/cuponsPromocionaisController");
const auth = require("../controllers/authController");

router.post("/", auth.autenticacaoAPI, cuponsPromocionaisController.validarPrivilegioUsuario, cuponsPromocionaisController.validarCupons, cuponsPromocionaisController.inserir);
router.post("/participante", cuponsPromocionaisController.inserirParticipante);
router.post("/resgatarcupom", auth.autenticacaoAPI, cuponsPromocionaisController.validarPrivilegioUsuario, cuponsPromocionaisController.resgatarCupom);
router.post("/encerrar", auth.autenticacaoAPI, cuponsPromocionaisController.validarPrivilegioUsuario, cuponsPromocionaisController.encerrar);
router.put("/", auth.autenticacaoAPI, cuponsPromocionaisController.validarPrivilegioUsuario, cuponsPromocionaisController.validarCupons, cuponsPromocionaisController.editar);
router.post("/novaopcaopersonalizada", express.urlencoded({extended: true}), auth.autenticacaoAPI, cuponsPromocionaisController.novaOpcaoPersonalizada);
router.post("/editaropcaopersonalizada", express.urlencoded({extended: true}), auth.autenticacaoAPI, cuponsPromocionaisController.editarOpcaoPersonalizada)
router.get("/downloadplanilhaparticipantes", auth.autenticacaoPagina, cuponsPromocionaisController.downloadPlanilhaParticipantes);
router.get("/downloadplanilhacodigos", auth.autenticacaoPagina, cuponsPromocionaisController.downloadPlanilhaCodigos);

module.exports = router;