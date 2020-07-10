const clienteController = require("./clienteController");
const Cliente = require("../models/Cliente");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const index = async (req, res)=>{
    let clientes = await Cliente.find();
    res.render("index", {clientes, userLogado: req.user})
}
const contato = async (req, res)=>{ 
    try{
        let clientes = await Cliente.find();
        return res.render("contato", {clientes, userLogado: req.user, mensagemEnviada: false});
    }   
    catch(error){
        console.log(error);        
    }
}
const contatoEnviarEmail = async (req, res)=>{
    let contato = req.body;
    let clientes = await Cliente.find();
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: contato.email,
        subject: `${contato.assunto} - ${contato.nome}`,
        text: contato.mensagem
    }).then(info=>{
        res.render("contato", {
            userLogado: req.user,
            clientes,
            mensagemEnviada: true,
            erro: false,
            mensagem: `Obrigado por nos enviar uma mensagem, ${contato.nome}, em breve a responderemos.`
        });
    }).catch(error=>{
        console.log(error);
        res.render("contato", {
            userLogado: req.user,
            clientes,
            mensagemEnviada: true,
            erro: true,
            mensagem: `Caso não esteja conseguindo enviar o e-mail por aqui, nos envie uma mensagem direto para contato@-encarte.com.`
        });
    });
}
module.exports = {
    index,
    contato,
    contatoEnviarEmail
}