const express = require("express");
const router = express.Router();
const parceiroController = require("../controllers/parceiroController");
const fileUpload = require("express-fileupload");
const path = require("path");


router.use(express.urlencoded());
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../img/temp")
}));

router.post("/inserir", parceiroController.inserirParceiro);
router.post("/editar", parceiroController.editarOuExcluirParceiro)


module.exports = router;