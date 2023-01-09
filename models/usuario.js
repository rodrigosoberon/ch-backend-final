const {Schema, model} = require("mongoose");

const usuariosCollection = "usuarios"

const usuarioSchema = new Schema({
    username: {type:String}, //Utilizo username como correo para autenticar
    password: {type: String},
    name: {type: String},
    address: {type:String},
    age: {type: Number},
    phone: {type: String},
    avatarURL: {type: String}
}, {versionKey: false}) //Para que no agregue '__v'

const usuarios = model(usuariosCollection, usuarioSchema)
module.exports = usuarios