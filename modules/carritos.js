const express = require("express");
const Contenedor = require("./manejo-archivos")
const {Router} = express;
const router = Router();

const contenedor = new Contenedor("../src/carritos.txt")
const contenedorProductos = new Contenedor("../src/productos.txt")


router.post("/", (req, res) => {
    let carritos
    contenedor.getAll().then(response => carritos = response).then(() => {
        const arrayIds = carritos.map((carrito) => carrito.id) //Creo un array con todos los IDs
        let ultimo
        arrayIds.length ? ultimo = Math.max(...arrayIds) : ultimo = 0 // Si hay elementos, determino el mayor(último)
        const siguienteId = ultimo + 1
        const timestamp = new Date().toLocaleString()
        contenedor.save({
            id: siguienteId,
            productos: [],
            timestamp: timestamp
        }).then(() => res.send({"id": siguienteId}))
    })
})

router.post("/:id/productos", (req, res) => {
    const id = parseInt(req.params.id)
    contenedor.getById(id).then(carrito => {
        //valido que exista el carrito
        if (carrito.length) {
            const productos = req.body
            //recorro el array de productos recibidos por body
            productos.forEach(producto => {
                //obtengo los datos de cada producto del file de productos
                contenedorProductos.getById(parseInt(producto.id)).then((infoProducto) => {
                    //agrego al array de productos
                    carrito[0].productos.push(infoProducto[0])
                }).then(() => {
                    //persisto el producto en el carrito
                    contenedor.deleteById(id).then(() => contenedor.save(carrito[0]))
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
    const id = parseInt(req.params.id)
    contenedor.getById(id).then(carrito => {
        if (carrito.length) {
            contenedor.deleteById(id).then(() => res.sendStatus(200))
        } else {
            res.status(400).json({error: "carrito no encontrado"})
        }
    })
})

router.delete("/:id/productos/:id_prod", (req, res) => {
    const idCarrito = parseInt(req.params.id)
    const idProducto = parseInt(req.params.id_prod)
    contenedor.getById(idCarrito).then(carrito => {
        //valido que exista el carrito
        if (carrito.length) {
            //Busco el id del producto en el carrito
            const posicionProducto = carrito[0].productos.findIndex(p => p.id == idProducto)
            if (posicionProducto === -1) {
                res.status(400).json({error: "no se encontro el producto en el carrito"})
            } else {
                //si lo encuentro, lo borro del carrito en memoria y lo actualizo (borro y guardo en filesystem)
                carrito[0].productos.splice(posicionProducto, 1)
                contenedor.deleteById(idCarrito).then(() => {
                    contenedor.save(carrito[0]).then(() => res.sendStatus(200))
                })
            }
        } else {
            res.status(400).json({error: "carrito no encontrado"})
        }
    })
})

router.get("/", (req, res) => {
    contenedor.getAll().then(response => {
        res.send(response)
    })
});

router.get("/:id/productos", (req, res) => {
    contenedor.getAll().then(response => {
        const carritoEncontrado = response.filter((carrito) => carrito.id == req.params.id)
        carritoEncontrado.length
            ? res.send(carritoEncontrado[0].productos)
            : res.status(400).json({error: "carrito no encontrado"})
    })
})

module.exports = router;