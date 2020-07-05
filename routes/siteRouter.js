const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

router.get("/", siteController.index);
router.get("/contato", siteController.contato);
router.post("/contato", express.urlencoded({extended: true}), siteController.contatoEnviarEmail);
module.exports = router;