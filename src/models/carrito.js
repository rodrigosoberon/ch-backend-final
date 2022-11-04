import {Schema, model} from "mongoose";

const carritosCollection = "carritos";

const carritoSchema = new Schema({
    timestamp: {type: String},
    productos: [],
}, {versionKey: false}) //Para que no agregue '__v'

const carritos = model(carritosCollection, carritoSchema)

export default carritos