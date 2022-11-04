import {Schema, model} from "mongoose";

const productosCollection = "productos";

const productoSchema = new Schema({
    timestamp: {type: String},
    nombre: {type: String},
    descripcion: {type: String},
    codigo: {type: String},
    thumbnail: {type: String},
    precio: {type: Number},
    stock: {type: Number}
}, {versionKey: false}) //Para que no agregue '__v'

const productos = model(productosCollection, productoSchema)

export default productos