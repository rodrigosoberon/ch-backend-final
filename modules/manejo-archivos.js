const fs = require("fs");

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async #readFile() {
        //? metodo privado para lectura de archivo
        try {
            const data = await fs.promises.readFile(this.nombreArchivo);
            const parsedData = JSON.parse(data);
            return parsedData;
        } catch (e) {
            console.log(e);
        }
    }

    async save(obj) {

        const data = await this.#readFile();
        await fs.promises.writeFile(
            this.nombreArchivo,
            JSON.stringify(
                [
                    ...data,
                    {
                        ...obj
                    },
                ],
                null,
                2
            )
        );
    }

    async getById(number) {
        //? Devuelve el array filtrado por id
        const data = await this.#readFile();
        const object = Object.values(data).filter((prod) => prod.id === number);
        return object ? object : null;
    }

    async getAll() {
        //? Devuelve el array completo
        const data = await this.#readFile();
        return data;
    }

    async deleteById(number) {
        //? Guarda el array entero de los objetos con id distinto al parametro.
        const data = await this.#readFile();
        const filteredData = Object.values(data).filter(
            (prod) => prod.id !== number
        );
        await fs.promises.writeFile(
            this.nombreArchivo,
            JSON.stringify(filteredData, null, 2)
        );
    }

    async deleteAll() {
        //? Inicializa el archivo con un array vacio. Si no existe lo crea
        await fs.promises.writeFile(this.nombreArchivo, "[]");
        console.log("Objectos eliminados");
    }
}

module.exports = Contenedor
