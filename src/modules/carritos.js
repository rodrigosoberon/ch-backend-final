import express from 'express';
import ContenedorCarritos from "../daos/carritosDAO.js"
import ContenedorProductos from "../daos/productosDAO.js"

const {Router} = express;
const router = Router();

const contenedorCarritos = new ContenedorCarritos()
const contenedorProductos = new ContenedorProductos()

router.post("/", (req, res) => {
    const timestamp = new Date().toLocaleString()
    contenedorCarritos.save({timestamp: timestamp, productos: []}).then(response => res.status(201).json(response))
})

router.post("/:id/productos", (req, res) => {
    contenedorCarritos.getById(req.params.id).then(carrito => {
        //valido que exista el carrito
        if (carrito.length) {
            //recorro el array de productos recibidos por body
            req.body.forEach(producto => {
                //obtengo los datos de cada producto del file de productos
                contenedorProductos.getById(producto.id).then((infoProducto) => {
                    // const miProducto = {...infoProducto[0]._doc, cantidad: producto.cantidad}
                    const miProducto = {...infoProducto[0],id: producto.id, cantidad: producto.cantidad}
                    //Agrego al array productos del carrito
                    contenedorCarritos.addProduct(req.params.id, miProducto)
                })
            })
            //fin del POST
            res.sendStatus(200)
        } else {
            res.status(400).json({error: "carrito no encontrado"})
        }
    })
})

router.delete("/:id", (req, res) => {
    contenedorCarritos.getById(req.params.id).then(carrito => {
        if (carrito.length) {
            contenedorCarritos.deleteById(req.params.id).then(() => res.sendStatus(200))
        } else {
            res.status(400).json({error: "carrito no encontrado"})
        }
    })
})

router.delete("/:id/productos/:id_prod", (req, res) => {
    const idCarrito = req.params.id
    const idProducto = req.params.id_prod
    contenedorCarritos.getById(idCarrito).then(carrito => {
        //valido que exista el carrito
        if (carrito.length) {
            // contenedorCarritos.updateById(idCarrito, {$pull: [{productos: {_id: idProducto}}]})
            contenedorCarritos.removeProduct(idCarrito, idProducto)
                .then(() => res.sendStatus(200))
        } else {
            res.status(400).json({error: "carrito no encontrado"})
        }
    })
})

router.get("/", (req, res) => {
    contenedorCarritos.getAll().then(response => {
        res.send(response)
    })
});

router.get("/:id/productos", (req, res) => {
    contenedorCarritos.getById(req.params.id).then(response => {
        response.length
            ? res.send(response[0].productos)
            : res.status(400).json({error: "carrito no encontrado"})
    })
})

export default router;