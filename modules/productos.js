const express = require("express");
const Contenedor = require("./manejo-archivos")
const {Router} = express;
const router = Router();

const administrador = false

const contenedor = new Contenedor("../src/productos.txt")


router.get("/", (req, res) => {
    let productos
    contenedor.getAll().then(response => {
        productos = response
    }).then(() => res.send(productos))
});

router.get("/:id", (req, res) => {
    contenedor.getById(parseInt(req.params.id)).then(producto => {
        if (producto.length) {
            res.send(producto[0])
        } else {
            res.status(400).json({error: "producto no encontrado"})
        }
    })
})


router.put("/:id", (req, res) => {
    if (administrador) {
        const id = parseInt(req.params.id)
        contenedor.getById(id).then(producto => {
            //Valido que exista el producto
            if (producto.length) {
                //Elimino el original
                contenedor.deleteById(id).then(() => {
                    //Guardo la informacion del body con el mismo Id
                    contenedor.save({id: id, ...req.body}).then(() => res.sendStatus(200))
                })
            } else {
                res.status(400).json({error: "producto no encontrado"})
            }
        })
    } else {
        res.status(400).json({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`})
    }

});

router.post("/", (req, res) => {
    if (administrador) {
        let productos
        contenedor.getAll().then((response) => {
            productos = response
        }).then(() => {
            //Calculo de proximo Id a asignar
            const arrayIds = productos.map((producto) => producto.id) //Creo un array con todos los IDs
            let ultimo
            arrayIds.length ? ultimo = Math.max(...arrayIds) : ultimo = 0 // Si hay elementos, determino el mayor(último)
            const proxId = ultimo + 1

            //Guardo el producto con timestamp y devuelvo su Id
            const timestamp = new Date().toLocaleString()
            contenedor.save({id: proxId, timestamp: timestamp, ...req.body})
            res.status(201).json(proxId)
        })
    } else {
        res.status(400).json({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`})
    }


})

router.delete("/:id", (req, res) => {
    if (administrador) {
        contenedor.deleteById(parseInt(req.params.id)).then(() => {
            res.sendStatus(200)
        })
    } else {
        res.status(400).json({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`})
    }
});

module.exports = router;
