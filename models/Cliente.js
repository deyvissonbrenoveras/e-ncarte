const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    descricao: {type: String, required: true, minlength: 5, maxlength: 200},
    preco: {type: Number, require: true},
    destaque: {type: Boolean, requre: true},
    imagem: {type: String}
})

const filiadoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    endereco: {type: String},
    telefone: {type: String},
    logo: {type: String, required: true}
})
const parceiroSchema = new mongoose.Schema({
    nome: {type: String},
    logo: {type: String, required: true}
})

const participanteSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    codigo: {type: String},
    cupomResgatado: {type: Boolean, default: false},
    opcaoPersonalizada: {
        type: mongoose.Schema.Types.ObjectId,
    }
})
const codigoSchema = new mongoose.Schema({
    codigo: {type: String},
    resgatado: {type: Boolean, default: false}
})
const opcaoPersonalizadaSchema = new mongoose.Schema({
    descricao: {type: String, required: true},
    quantidadeDisponivel: {type: Number},
    quantidadeUtilizada: {type: Number, default: 0},
    codigos: [codigoSchema]
})

const cuponsPromocionaisSchema = new mongoose.Schema({
    nome: {type: String},
    chamada: {type: String},
    periodoInicio: {type: Date},
    periodoFim: {type: Date},
    quantidadeCupons: {type: Number, default: 0},
    cuponsUtilizados: {type: Number, default: 0},
    ativa: {type: Boolean, default: true},
    participantes: [participanteSchema],
    opcoesPersonalizadas: [opcaoPersonalizadaSchema]

})


const clienteSchema = new mongoose.Schema({
    nome: {type: String, required: true, minlength: 4, maxlength: 100},
    nomeUrl: {type: String, required: true, minlength:4, maxlength: 100},
    cidade: {type: String},
    endereco: {type: String},
    contato: {type: String},
    whatsapp: {type: String},
    logo: {type: String},
    imagemCampanha: {type: String},
    produtos: [produtoSchema],
    filiados: [filiadoSchema],
    parceiros: [parceiroSchema],
    cuponsPromocionais: [cuponsPromocionaisSchema]
});

module.exports = mongoose.model("Cliente", clienteSchema);