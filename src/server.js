const express = require("express");
const productos = require("../modules/productos");
const carritos = require("../modules/carritos")
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/productos", productos);
app.use("/api/carrito", carritos);

app.use(express.static("./public"));

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
server.on("error", (error) => console.log(`Server error: ${error}`));
