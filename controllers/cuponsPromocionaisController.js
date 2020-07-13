const Cliente = require("../models/Cliente");
const scheduler = require("node-schedule");
var voucher_codes = require('voucher-code-generator');
const fs = require("fs");
const xlsx = require("xlsx");
const { response } = require("express");
async function encerrarCampanhasExpiradas() {
    try {
        let clientes = await Cliente.find({});
        await clientes.forEach((cliente) => {
            cliente.cuponsPromocionais.forEach((campanha) => {
                let hoje = new Date();
                const dia = hoje.getDate();
                const mes = hoje.getMonth();
                const ano = hoje.getFullYear();
                hoje = new Date(ano, mes, dia);

                if (campanha.periodoFim < hoje) {
                    campanha.ativa = false;
                }
            });
        });
        clientes.forEach(async (cliente) => {
            await cliente.save();
        })
    } catch (error) {
        console.log(error);
    }
}

//Agendo encerramento automático de todas as campanhas à meia noite.
scheduler.scheduleJob("0 0 * * *", encerrarCampanhasExpiradas);
encerrarCampanhasExpiradas();

const inserir = async (req, res) => {
    try {
        let cuponsPromocionais = req.body;
        let idCliente = req.headers.idcliente;

        let cliente = await Cliente.findById(idCliente).select("cuponsPromocionais");

        cliente.cuponsPromocionais.forEach(camp => {
            camp.ativa = false;
        });

        let campanha = cliente.cuponsPromocionais.create(cuponsPromocionais);

        cliente.cuponsPromocionais.push(campanha);
        await cliente.save();
        return res.json({ message: "A campanha foi cadastrada com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um erro ao cadastrar a campanha de cupons" });
    }

}
const inserirParticipante = async (req, res) => {
    try {
        let participante = req.body;
        let idCliente = req.headers.idcliente;
        let idCampanha = req.headers.idcampanha;

        let cliente = await Cliente.findById(idCliente).select("cuponsPromocionais");

        let promocao = cliente.cuponsPromocionais.filter(cupons => {
            return cupons._id == idCampanha;
        })[0];

        if (!participante.nome)
            return res.status(400).json({ message: "Por favor insira um nome" });

        //Valida e-mail
        if (!participante.email)
            return res.status(400).json({ message: "Por favor insira um e-mail" });

        
        let validarEmail = promocao.participantes.filter(part => {
            return part.email == participante.email;
        })
        if (validarEmail.length > 0)
            return res.status(400).json({ message: "O e-mail informado já está participando da promoção, por favor, insira outro e-mail." });
        //Valida o código promocional
        if (promocao.opcoesPersonalizadas && promocao.opcoesPersonalizadas.length > 0){
            if (!participante.codigo){
                return res.status(500).json({ message: "Por favor insira o cupom" });
            }
            let cupomValido = false;
            promocao.opcoesPersonalizadas.forEach(opcao =>{
                opcao.codigos.forEach(codigo => {
                    if (codigo.codigo == participante.codigo){
                        if (codigo.resgatado){
                            return res.status(500).json({ message: "O cupom informado já foi resgatado :(" });
                        }
                        codigo.resgatado = true;
                        opcao.quantidadeUtilizada++; 
                        participante.opcaoPersonalizada = opcao._id;                       
                        cupomValido = true;
                    }
                })
            })
            if (!cupomValido){
                return res.status(500).json({ message: "O cupom informado é inválido :(" });
            }
            participante.cupomResgatado = true;
        }
        let novoParticipante = promocao.participantes.create(participante);
        promocao.participantes.push(novoParticipante);

        await cliente.save();

        return res.json({ message: "Cupom cadastrado com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um erro de servidor ao confirmar a sua participação na promoção :(" });
    }

}
const resgatarCupom = async (req, res) => {
    //Realiza o resgate do cupom e encerra a campanha caso tenha atingido o limite de cupons resgatados.
    try {
        let idCliente = req.headers.idcliente;
        let idCampanha = req.headers.idcampanha;
        let idParticipante = req.headers.idparticipante;
        let campanhaEmAtualizacao;
        let cliente = await Cliente.findById(idCliente);

        cliente.cuponsPromocionais.forEach(campanha => {
            if (campanha._id == idCampanha) {
                campanhaEmAtualizacao = campanha;
                let cuponsResgatados = 1;
                campanha.participantes.forEach(participante => {
                    if (participante.cupomResgatado)
                        cuponsResgatados++;
                    if (participante._id == idParticipante) {
                        participante.cupomResgatado = true;
                    }
                })
                if (cuponsResgatados >= campanha.quantidadeCupons & campanha.quantidadeCupons != 0) {
                    campanha.ativa = false;
                }
            }
        })
        await cliente.save();

        if (campanhaEmAtualizacao.ativa == false)
            return res.status(201).json({ message: "O cupom foi resgatado e a campanha encerrada devido atingir o limite de cupons resgatados." });
        else
            return res.json({ message: "O cupom foi resgatado!" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um erro de servidor ao resgatar o cupom." });
    }
}
const encerrar = async (req, res) => {
    try {
        let idCliente = req.headers.idcliente;
        let idCampanha = req.headers.idcampanha;

        let cliente = await Cliente.findById(idCliente);
        cliente.cuponsPromocionais.forEach(campanha => {
            if (campanha._id == idCampanha) {
                campanha.ativa = false;
            }
        })
        await cliente.save();
        return res.json({ message: "A campanha foi encerrada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um erro de servidor ao encerrar a campanha" });
    }
}
const editar = async (req, res) => {
    try {
        let idCliente = req.headers.idcliente;
        let idCampanha = req.headers.idcampanha;
        let campanha = req.body;

        let cliente = await Cliente.findOneAndUpdate({ _id: idCliente, "cuponsPromocionais._id": idCampanha },
            {
                "$set": {
                    "cuponsPromocionais.$.nome": campanha.nome,
                    "cuponsPromocionais.$.chamada": campanha.chamada,
                    "cuponsPromocionais.$.periodoInicio": campanha.periodoInicio,
                    "cuponsPromocionais.$.periodoFim": campanha.periodoFim,
                }
            }, { useFindAndModify: false });

        encerrarCampanhasExpiradas();

        return res.json({ message: "A campanha foi editada" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um erro de servidor ao editar a campanha" });
    }
}
const validarCupons = async (req, res, next) => {
    let campanha = req.body;
    let idCliente = req.headers.idcliente;
    let idCampanha = req.headers.idcampanha;

    let periodoInicio = Date.parse(campanha.periodoInicio);
    let periodoFim = Date.parse(campanha.periodoFim);
    if (campanha.nome.length < 3 || campanha.nome.length > 40)
        return res.status(400).json({ message: "Por favor, insira um nome que possua entre 3 e 40 caracteres" });
    else if (campanha.chamada.length < 10 || campanha.chamada.length > 150)
        return res.status(400).json({ message: "Por favor, insira uma chamada que possua entre 10 e 150 caracteres" });
    else if (!periodoInicio || !periodoFim || periodoInicio < 0 || periodoFim < 0)
        return res.status(400).json({ message: "Por favor, insira um período de campanha válido" });
    else if (periodoInicio >= periodoFim) {
        return res.status(400).json({ message: "A data de início não pode ser igual ou depois da data final da campanha" });
    }
    next();
}
const validarPrivilegioUsuario = async (req, res, next) => {
    if (req.user.privilegio < 2){
        next();
    }
    else{
        let idCliente = req.headers.idcliente;
        let clienteLiberado = req.user.clientes.filter(cliente => {
            return cliente == idCliente
        })
        if (clienteLiberado.length == 0)
            return res.status(403).json({ message: "O usuário não tem permissão para a ação" });
        next();
    }
    
}
const novaOpcaoPersonalizada = (req, res) => {
    let { idCliente, idCampanha } = req.body;
    let opcaoPersonalizada = req.body;
    let codigos = voucher_codes.generate({
        length: 5,
        count: opcaoPersonalizada.quantidadeDisponivel,
        charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
    opcaoPersonalizada.codigos = codigos.map(codigo => {
        return {codigo, resgatado: false}
    })
    Cliente.findOneAndUpdate({ _id: idCliente, "cuponsPromocionais._id": idCampanha },
        {
            "$push": {
                "cuponsPromocionais.$.opcoesPersonalizadas": opcaoPersonalizada
            }
        }, { useFindAndModify: false }).then(() => {
            return res.redirect("back");
        });
}
const editarOpcaoPersonalizada = (req, res) => {    
    const { idCliente, idCampanha, idOpcao } = req.body;

    Cliente.findOne({ _id: idCliente }, (err, cliente) => {
        if (err) {
            console.log(err)
            return res.render("erro", { erro: "Houve um erro interno ao atualizar a opção personalizada" })
        }
        if (!cliente)
            return res.render("erro", { erro: "Cliente não encontrado" })
        let campanha = cliente.cuponsPromocionais.filter(campanha => campanha._id.equals(idCampanha))[0];
        let opcao = campanha.opcoesPersonalizadas.filter(opcao => opcao._id == idOpcao)[0];
        if (!campanha || !opcao)
            return res.render("erro", { erro: "Campanha ou opção personalizada não encontrada" })
        opcao.descricao = req.body.descricao;
        cliente.save(err => {
            if (err){
                console.log(err)
                return res.render("erro", { erro: "Houve um erro interno ao atualizar a opção personalizada" })
            }
            return res.redirect("back")
        })

    })
}

const downloadPlanilhaParticipantes = (req, res)=>{
    const {idCliente, idCampanha} = req.query;
    Cliente.findById(idCliente, (err, cliente)=>{
        if (err){
            console.log(err);
            return res.render("erro", { erro: "Houve um erro exportar os partipantes para a planilha" })
        }
        if (!cliente){
            return res.render("erro", { erro: "Cliente não encontrado" })
        }
        const campanha = cliente.cuponsPromocionais.filter(campanha =>{
            return campanha._id.equals(idCampanha);
        })[0];
        let wb = xlsx.utils.book_new();
        const filename = `Participantes da campanha ${campanha.nome} - ${cliente.nome}`;
        wb.Props = {
            Title: filename,
            Subject: filename,
            Author: "e-ncarte",
        }
        wb.SheetNames.push("Participantes")

        let wsdata = campanha.participantes.map(participante =>{
            const opcaoPersonalizada = campanha.opcoesPersonalizadas.filter(opcao =>{
                return opcao._id.equals(participante.opcaoPersonalizada);
            })[0];
            const opcaoDescricao = opcaoPersonalizada ? opcaoPersonalizada.descricao : "";
            return [
                participante.nome,
                participante.email,
                participante.codigo,
                opcaoDescricao
            ]
        })
        wsdata = [["Nome", "E-mail", "Código", "Opção selecionada"], ...wsdata];
        let ws = xlsx.utils.aoa_to_sheet(wsdata);
        wb.Sheets["Participantes"] = ws;

        let wbout = xlsx.write(wb, {bookType: "xlsx", type: "buffer"})
        res.setHeader('Content-Type', 'application/buffer');
        res.setHeader('Content-disposition', `attachment; filename=${filename}.xlsx`);
        return res.send(wbout)
    })
    
}
const downloadPlanilhaCodigos = (req, res) =>{
    const {idCliente, idCampanha} = req.query;
    Cliente.findById(idCliente, (err, cliente)=>{
        if (err){
            console.log(err);
            return res.render("erro", { erro: "Houve um erro exportar os partipantes para a planilha" })
        }
        if (!cliente){
            return res.render("erro", { erro: "Cliente não encontrado" })
        }
        const campanha = cliente.cuponsPromocionais.filter(campanha =>{
            return campanha._id.equals(idCampanha);
        })[0];
        let wb = xlsx.utils.book_new();
        const filename = `Códigos da campanha ${campanha.nome} - ${cliente.nome}`;
        wb.Props = {
            Title: filename,
            Subject: filename,
            Author: "e-ncarte",
        }
        wb.SheetNames.push("Códigos promocionais")

        let cabecalho = campanha.opcoesPersonalizadas.map(opcao =>{
            return opcao.descricao;
        })
        let lenghtOfBiggerArray = 0;
        let codigos = campanha.opcoesPersonalizadas.map(opcao =>{
            if (opcao.codigos.length > lenghtOfBiggerArray)
                lenghtOfBiggerArray = opcao.codigos.length;
            return opcao.codigos.map(codigo => {
                return codigo.codigo;
            })
        })

        let codigosOrdenados = []
        for (let i = 0; i < lenghtOfBiggerArray; i++){
            if (!codigosOrdenados[i])
                    codigosOrdenados[i] = [];
            for (let k = 0; k < cabecalho.length ; k++){                
                let code = codigos[k] ? codigos[k][i] : "";
                codigosOrdenados[i][k] = code
            }
            
        }

        codigosOrdenados.unshift(cabecalho);
        let ws = xlsx.utils.aoa_to_sheet(codigosOrdenados);
        wb.Sheets["Códigos promocionais"] = ws;

        let wbout = xlsx.write(wb, {bookType: "xlsx", type: "buffer"})
        res.setHeader('Content-Type', 'application/buffer');
        res.setHeader('Content-disposition', `attachment; filename=${filename}.xlsx`);
        return res.send(wbout)
    })

}
module.exports = {
    inserir,
    inserirParticipante,
    resgatarCupom,
    encerrar,
    editar,
    validarCupons,
    validarPrivilegioUsuario,
    novaOpcaoPersonalizada,
    editarOpcaoPersonalizada,
    downloadPlanilhaParticipantes,
    downloadPlanilhaCodigos
}