import {mongo_url, base, DB_ENGINE} from "../config.js";
import MongoCarritosDAO from './carritos/carritosDAOMongoDB.js'
import FirebaseCarritosDAO from './carritos/carritosDAOFirebase.js'

let contenedorCarrito

if(DB_ENGINE === 'mongoDB'){
    contenedorCarrito = class CarritosGeneralDAO extends MongoCarritosDAO{
        constructor() {
            super();
        }
    }
}else{
    contenedorCarrito = class CarritosGeneralDAO extends FirebaseCarritosDAO{
        constructor() {
            super();
        }
    }
}

export default contenedorCarrito;