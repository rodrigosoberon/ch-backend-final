import ContenedorMongoDB from "../../contenedores/contenedorMongoDB.js";
import cartModel from '../../models/carrito.js'

class CarritosDAOMongoDB extends ContenedorMongoDB{
    constructor() {
        super(cartModel);
    }
}

export default CarritosDAOMongoDB;