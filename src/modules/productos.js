import express from 'express';
import Contenedor from "../daos/productosDAO.js"
const {Router} = express;
const router = Router();

const administrador = true

const contenedor = new Contenedor();

router.get("/", (req, res) => {
    let productos
    contenedor.getAll().then(response => {
        productos = response
    }).then(() => res.send(productos))
});

router.get("/:id", (req, res) => {
    contenedor.getById(req.params.id).then(producto => {
        if (producto.length) {
            res.send(producto[0])
        } else {
            res.status(400).json({error: "producto no encontrado"})
        }
    })
})

router.put("/:id", (req, res) => {
    if (administrador) {
        contenedor.getById(req.params.id).then(producto => {
            //Valido que exista el producto
            if (producto.length) {
                contenedor.updateById(req.params.id,req.body).then(() => res.sendStatus(200))
            }else {
                res.status(400).json({error: "producto no encontrado"})
            }
        })
    } else {
        res.status(400).json({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`})
    }
});

router.post("/", (req, res) => {
    if (administrador) {
        const timestamp = new Date().toLocaleString();
        contenedor.save({timestamp: timestamp, ...req.body}).then(response => res.status(201).json(response))
    } else {
        res.status(400).json({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`})
    }

})

router.delete("/:id", (req, res) => {
    if (administrador) {
        contenedor.deleteById(req.params.id).then(() => {
            res.sendStatus(200)
        })
    } else {
        res.status(400).json({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`})
    }
});

export default router;
