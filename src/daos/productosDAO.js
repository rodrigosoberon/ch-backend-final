import {mongo_url, base, DB_ENGINE} from "../config.js";
import MongoProductosDAO from './productos/productosDAOMongoDB.js'
import FirebaseProductosDAO from './productos/productosDAOFirebase.js'

let contenedorProducto

if(DB_ENGINE === 'mongoDB'){
    contenedorProducto = class ProductosGeneralDAO extends MongoProductosDAO{
        constructor() {
            super();
        }
    }
}else{
    contenedorProducto = class ProductosGeneralDAO extends FirebaseProductosDAO{
        constructor() {
            super();
        }
    }
}

export default contenedorProducto;