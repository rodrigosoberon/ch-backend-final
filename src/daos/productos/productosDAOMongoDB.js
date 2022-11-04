import ContenedorMongoDB from "../../contenedores/contenedorMongoDB.js";
import productModel from '../../models/producto.js'

class ProductosDAOMongoDB extends ContenedorMongoDB{
    constructor() {
        super(productModel);
    }
}

export default ProductosDAOMongoDB;