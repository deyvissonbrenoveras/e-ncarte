const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4, maxlength: 150},
    email: {type: String, required: true, minlength: 4, maxlength: 300},
    password: {type: String, required: true},
    privilegio: {type: Number, default: 2},
    clientes: [String]
})

module.exports = mongoose.model("User", userSchema);